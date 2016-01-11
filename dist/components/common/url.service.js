System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var UrlService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UrlService = (function () {
                function UrlService() {
                    this.params = {};
                }
                UrlService.prototype.store = function (params) {
                    this.params = params;
                };
                UrlService.prototype.getParam = function (key) {
                    return this.params[key];
                };
                UrlService.prototype.getAll = function () {
                    return this.params;
                };
                UrlService.prototype.add = function (key, val, include) {
                    if (include === void 0) { include = true; }
                    this.params[key] = include ? val : '-' + val;
                    if (this.params[key] === '') {
                        this.remove(key);
                    }
                    return this.params;
                };
                UrlService.prototype.remove = function (key) {
                    if (_.has(this.params, key)) {
                        delete this.params[key];
                    }
                    return this.params;
                };
                UrlService.prototype.addMultiple = function (options) {
                    var _this = this;
                    _.each(options, function (val, key) {
                        _this.add(key, val);
                    });
                    return this.params;
                };
                UrlService.prototype.toggle = function (key, val, include) {
                    if (include === void 0) { include = true; }
                    val = val.toString();
                    // If the key exists in the param object, create array from string value
                    var values = this.params[key] ? this.params[key].split(',') : [];
                    if (include) {
                        values = this.toggleInclude(key, val, values);
                    }
                    else {
                        values = this.toggleExclude(key, val, values);
                    }
                    // Convert the array back to a string
                    this.params[key] = values.join();
                    // If the key has no value, remove it from the params
                    if (!this.params[key]) {
                        this.remove(key);
                    }
                    return this.params;
                };
                UrlService.prototype.toggleInclude = function (key, val, values) {
                    // Automatically undo any exclusion for this key
                    values = _.without(values, '-' + val);
                    // If value already exists in params, remove it
                    if (_.contains(values, val)) {
                        values = _.without(values, val);
                    }
                    else {
                        values.push(val);
                    }
                    return values;
                };
                UrlService.prototype.toggleExclude = function (key, val, values) {
                    // Automatically remove any inclusive value for this key
                    values = _.without(values, val);
                    // If negative value already exists in params, remove it
                    if (_.contains(values, '-' + val)) {
                        values = _.without(values, '-' + val);
                    }
                    else {
                        values.push('-' + val);
                    }
                    return values;
                };
                UrlService.prototype.extend = function (params) {
                    return _.extend({}, this.params, params);
                };
                UrlService.prototype.getRouteParamsFromMovieProps = function (movieProps, defaultMovie) {
                    var routeParams = {};
                    _.each(movieProps, function (val, key) {
                        if (!_.isEqual(val, defaultMovie[key])) {
                            routeParams[key] = val;
                        }
                    });
                    return routeParams;
                };
                UrlService.prototype.getMoviePropsFromRouteParams = function (routeParams, defaultMovie) {
                    var movieParams = {};
                    _.each(defaultMovie, function (val, key) {
                        if (routeParams[key]) {
                            movieParams[key] = decodeURIComponent(routeParams[key]);
                        }
                        else {
                            movieParams[key] = val;
                        }
                        if (key === 'adult' || key === 'video') {
                            if (routeParams[key])
                                movieParams[key] = routeParams[key] === "true" || routeParams[key] === true;
                        }
                        if (key === 'vote_average') {
                            if (routeParams[key])
                                movieParams[key] = parseFloat(routeParams[key]);
                        }
                        if (key === 'id' || key === 'vote_count') {
                            if (routeParams[key])
                                movieParams[key] = parseInt(routeParams[key], 10);
                        }
                    });
                    return movieParams;
                };
                UrlService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UrlService);
                return UrlService;
            })();
            exports_1("UrlService", UrlService);
        }
    }
});
//# sourceMappingURL=url.service.js.map