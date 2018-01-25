
angular.module('forgeExample').controller('NewOrderController', function ($scope, $location, locationParser, flash, OrderResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.order = $scope.order || {};
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The order was created successfully.'});
            $location.path('/Orders');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        OrderResource.save($scope.order, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Orders");
    };
});