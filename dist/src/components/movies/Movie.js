System.register([], function(exports_1) {
    var Movie;
    return {
        setters:[],
        execute: function() {
            Movie = (function () {
                function Movie(options) {
                    this.hasChanged = false;
                    for (var k in options) {
                        if (options.hasOwnProperty(k)) {
                            this[k] = options[k];
                        }
                    }
                    this.original = _.clone(this, true);
                }
                Movie.prototype.restore = function () {
                    var _this = this;
                    _.each(this.original, function (val, key) {
                        _this[key] = val;
                    });
                    this.hasChanged = false;
                };
                Movie.prototype.getProps = function () {
                    return _.omit(this, ['original', 'hasChanged']);
                };
                return Movie;
            })();
            exports_1("Movie", Movie);
        }
    }
});
//# sourceMappingURL=Movie.js.map