'use strict';

(function(){

    var module = angular.module('sg-iso3166', ['restangular']);


    module.provider('sgIso3166', function() {

        this.restUrl = 'http://localhost';

        this.$get = function() {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function() {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function(restUrl) {
            this.restUrl = restUrl;
        };
    });


    module.factory('Iso3166Restangular', ['Restangular', 'sgIso3166', function(Restangular, sgIso3166) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgIso3166.getRestUrl());
        });
    }]);


    module.factory('Iso3166AbstractModel', ['Iso3166Restangular', function(Iso3166Restangular){

        var url = '';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.id).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        }
    }]);


    module.factory('SGCountryCode', ['Iso3166Restangular',  function(Iso3166Restangular) {

        var url = 'countryCodes';
        var urlAlpha2Code = 'countryCodes/alpha2Code';
        var urlAlpha3Code = 'countryCodes/alpha3Code';
        var urlNumericCode = 'countryCodes/numericCode';
        var urlCount = 'countryCodes/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(urlAlpha3Code, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },


            $saveByAlpha2Code: function() {
                return Iso3166Restangular.one(urlAlpha2Code, this.alpha2Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },
            $saveByAlpha3Code: function() {
                return Iso3166Restangular.one(urlAlpha3Code, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },
            $saveByNumericCode: function() {
                return Iso3166Restangular.one(urlNumericCode, this.numericCode).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },


            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },
            $findByAlpha2code: function(alpha2Code){
                return Iso3166Restangular.one(urlAlpha2Code, alpha2Code).get();
            },
            $findByAlpha3code: function(alpha3Code){
                return Iso3166Restangular.one(urlAlpha3Code, alpha3Code).get();
            },
            $findByNumericCode: function(numericCode){
                return Iso3166Restangular.one(urlNumericCode, numericCode).get();
            },

            $count: function(){
                return Iso3166Restangular.one(urlCount).get();
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(urlAlpha3Code, id).remove();
            },
            $removeByAlpha2Code: function(id){
                return Iso3166Restangular.one(urlAlpha2Code, id).remove();
            },
            $removeByAlpha3Code: function(id){
                return Iso3166Restangular.one(urlAlpha3Code, id).remove();
            },
            $removeByNumericCode: function(id){
                return Iso3166Restangular.one(urlNumericCode, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlAlpha2Code, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlAlpha3Code, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlNumericCode, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlCount, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('SGCountryName', ['Iso3166Restangular',function(Iso3166Restangular) {

        var url = 'countryNames';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('SGLanguage', ['Iso3166Restangular',function(Iso3166Restangular) {

        var url = 'countryLanguages';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('SGSubdivisionCategory', ['Iso3166Restangular', function(Iso3166Restangular) {

        var url = 'subdivisionCategories';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('SGTerritory', ['Iso3166Restangular',function(Iso3166Restangular) {

        var url = 'territories';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);

})();