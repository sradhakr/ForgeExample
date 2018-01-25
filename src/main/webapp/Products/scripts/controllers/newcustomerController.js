
angular.module('forgeExample').controller('NewcustomerController', function ($scope, $location, locationParser, flash, customerResource , OrderResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.customer = $scope.customer || {};
    
    $scope.orderidList = OrderResource.queryAll(function(items){
        $scope.orderidSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("orderidSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.customer.orderid = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.customer.orderid.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The customer was created successfully.'});
            $location.path('/customers');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        customerResource.save($scope.customer, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/customers");
    };
});