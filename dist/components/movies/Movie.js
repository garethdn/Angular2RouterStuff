System.register([], function(exports_1) {
    var Movie;
    return {
        setters:[],
        execute: function() {
            Movie = (function () {
                function Movie(options) {
                    var _this = this;
                    this.hasChanged = false;
                    _.each(options, function (val, key) {
                        _this[key] = val;
                    });
                    this.original = options;
                }
                Movie.prototype.restore = function () {
                    var _this = this;
                    _.each(this.original, function (val, key) {
                        _this[key] = val;
                    });
                    this.hasChanged = false;
                };
                Movie.prototype.getProps = function () {
                    var _this = this;
                    var props = {};
                    _.each(this.original, function (val, key) {
                        props[key] = _this[key];
                    });
                    return props;
                };
                Movie.prototype.getChanges = function () {
                    var currentProps = this.getProps();
                    return _.reduce(this.original, function (result, value, key) {
                        return _.isEqual(value, currentProps[key]) ?
                            result : result.concat(key, value, currentProps[key]);
                    }, []);
                };
                return Movie;
            })();
            exports_1("Movie", Movie);
        }
    }
});
//# sourceMappingURL=Movie.js.map