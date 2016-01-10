System.register(['angular2/core', './Movie', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Movie_1, Rx_1;
    var MoviesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Movie_1_1) {
                Movie_1 = Movie_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            MoviesService = (function () {
                function MoviesService() {
                    this.movies = [];
                    this.initializeObservers();
                    this.initializeMovies();
                }
                MoviesService.prototype.initializeMovies = function () {
                    var _this = this;
                    window['movies']['results'].forEach(function (movie) {
                        _this.movies.push(new Movie_1.Movie(movie));
                    });
                    console.log(this.movies);
                };
                MoviesService.prototype.initializeObservers = function () {
                    var _this = this;
                    this.selectedMovie = new Rx_1.Observable(function (observer) { return _this._selectedMovieObserver = observer; }).share();
                };
                MoviesService.prototype.getSelectedMovie = function () {
                    return this._selectedMovie;
                };
                MoviesService.prototype.setSelectedMovie = function (params) {
                    var _this = this;
                    this._selectedMovie = _.findWhere(this.movies, { id: parseInt(params.id) }) || {};
                    _.each(params, function (val, key) {
                        _this._selectedMovie[key] = val;
                    });
                    this._selectedMovie.hasChanged = !_.isEqual(this._selectedMovie.original, this._selectedMovie.getProps());
                    this._selectedMovieObserver.next(this._selectedMovie);
                };
                MoviesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MoviesService);
                return MoviesService;
            })();
            exports_1("MoviesService", MoviesService);
        }
    }
});
//# sourceMappingURL=movies.service.js.map