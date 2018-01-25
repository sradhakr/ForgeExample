angular.module('forgeExample').factory('customerResource', function($resource){
    var resource = $resource('../rest/customers/:customerId',{customerId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});