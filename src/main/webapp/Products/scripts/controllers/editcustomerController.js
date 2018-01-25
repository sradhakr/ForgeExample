

angular.module('forgeExample').controller('EditcustomerController', function($scope, $routeParams, $location, flash, customerResource , OrderResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.customer = new customerResource(self.original);
            OrderResource.queryAll(function(items) {
                $scope.orderidSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.customer.orderid){
                        $.each($scope.customer.orderid, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.orderidSelection.push(labelObject);
                                $scope.customer.orderid.push(wrappedObject);
                            }
                        });
                        self.original.orderid = $scope.customer.orderid;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The customer could not be found.'});
            $location.path("/customers");
        };
        customerResource.get({customerId:$routeParams.customerId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.customer);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The customer was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.customer.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/customers");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The customer was deleted.'});
            $location.path("/customers");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.customer.$remove(successCallback, errorCallback);
    };
    
    $scope.orderidSelection = $scope.orderidSelection || [];
    $scope.$watch("orderidSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.customer) {
            $scope.customer.orderid = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.customer.orderid.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});