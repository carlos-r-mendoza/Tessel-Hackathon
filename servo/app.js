'use strict';
var app = angular.module('TesselApp');

app.controller('TesselController', function($scope) {
    $scope.high = function() {
            return $http.get('/high').then(function(val){
                return val;
            });
        }
    };
    }
});