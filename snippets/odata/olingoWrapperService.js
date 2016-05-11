'use strict';
myApp.factory('olingoWrapperService', ['localStorageService','$location', '$q', '$rootScope', function (localStorageService, $location, $q, $rootScope) {

    var _recipeService = {};
    var _oldOlingoODataClient = odatajs.oData.net.defaultHttpClient;
    var _authSensitiveOlingoClient = {
        request: function (request, success, error) {
            request.headers = request.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                request.headers.Authorization = 'Bearer ' + authData.token;
            }

            return _oldOlingoODataClient.request(request, success, error);
        }
    }

    function _getErrorInterceptorWrapper(deferred) {
        /// <summary>Creates an error interceptor which handles 401 Unauthorized responses, if error is not 401 then control is passed back to client error handler</summary>
        /// <param name="deferred" type="Object">An angularjs deferred promise</param>
        /// <returns type="Function">A error handler function</returns>
        return function (errorObj) {
            /// <summary>Handles errors from Olingo's HTTP client</summary>
            /// <param name="errorObj" type="Object">The error returned from Olingo's HTTP client</param>
            if (errorObj && errorObj.statusCode && errorObj.statusCode == 401) {
                $location.path('/login');
            } else {
                deferred.reject(errorObj);
            }
            $rootScope.$apply();
        };
    }

    function _getSuccessFunction(deferred) {
        /// <summary>Creates a success function for Olingo to resolve the given deferrred promise</summary>
        /// <param name="deferred" type="Object">An angularjs deferred promise</param>
        /// <returns type="Function">A success handler function</returns>
        return function (responseData) {
            /// <summary>Handles success responses from Olingo's HTTP client</summary>
            /// <param name="responseData" type="Object">A response object</param>
            deferred.resolve(responseData);
            $rootScope.$apply();
        };
    }

    function _makeRequest(request) {
        ///<summary>Encapsulates the common code necessary to execute a request using the Olingo JS library</summary>
        ///<param name="request" type="Object">The request object, must have a defined 'method' property</param>
        ///<returns type="Object">An angularjs promise object</returns>

        var deferred = $q.defer();
        if (request.method === 'GET') {
            odatajs.oData.read(request, _getSuccessFunction(deferred), _getErrorInterceptorWrapper(deferred), null, _authSensitiveOlingoClient);
        } else {
            odatajs.oData.request(request, _getSuccessFunction(deferred), _getErrorInterceptorWrapper(deferred), null, _authSensitiveOlingoClient);
        }
        return deferred.promise;
    }

    function getData(location) {
        /// <summary> Do a read only request against a specified URI and calls back to the given success or error functions</summary>
        /// <param name="location" type="String">The URI to read data from</param>
        /// <returns type="Object">An angularjs promise object</returns>
        return _makeRequest({ requestUri: location, method: 'GET' });
    }

    function postData(location, data) {
        /// <summary>Executes a post request against the given URI with the given data</summary>
        /// <param name="location" type="String">The URI to post data to</param>
        /// <param name="data" type="Object">The data to post back to the server</param>
        /// <returns type="Object">An angularjs promise object</returns>
        var requestObject = {
            requestUri: location,
            method: 'POST',
            data: data
        };
        
        return _makeRequest(requestObject);
    }

    function deleteData(location) {
        /// <summary>Executes a delete request against the given URI with the given data</summary>
        /// <param name="location" type="String">The URI to delete data from</param>
        /// <returns type="Object">AN angularjs promise object</returns>
        var requestObject = {
            requestUri: location,
            method: 'DELETE',
        };

        return _makeRequest(requestObject);
    }

    _recipeService.getData = getData;
    _recipeService.postData = postData;
    _recipeService.deleteData = deleteData;

    return _recipeService;

}]);
