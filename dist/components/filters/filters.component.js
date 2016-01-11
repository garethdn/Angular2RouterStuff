System.register(['angular2/core', 'angular2/router', '../movies/movies.service', '../common/url.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, movies_service_1, url_service_1;
    var FiltersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (movies_service_1_1) {
                movies_service_1 = movies_service_1_1;
            },
            function (url_service_1_1) {
                url_service_1 = url_service_1_1;
            }],
        execute: function() {
            FiltersComponent = (function () {
                function FiltersComponent(_moviesService, _urlService, _router) {
                    this._moviesService = _moviesService;
                    this._urlService = _urlService;
                    this._router = _router;
                    this._subscriptions = [];
                }
                FiltersComponent.prototype.ngOnInit = function () {
                    this.selectedMovie = this._moviesService.getSelectedMovie();
                    this.subscribeToSelectedMovie();
                };
                FiltersComponent.prototype.subscribeToSelectedMovie = function () {
                    var _this = this;
                    var sub = this._moviesService.selectedMovie.subscribe(function (movie) {
                        _this.selectedMovie = movie;
                    });
                    this._subscriptions.push(sub);
                };
                FiltersComponent.prototype.toggleBool = function (attr, val) {
                    var updatedUrlParams = this._moviesService.defaultMovieJSON[attr] === val ?
                        this._urlService.remove(attr) :
                        this._urlService.add(attr, val);
                    // this._router.parent.navigate(['Browse', { adult: true }]) 
                    this._router.parent.navigate(['Browse', updatedUrlParams]);
                };
                FiltersComponent.prototype.restore = function () {
                    var restoredParams = this.getOriginalUrlParamsFromMovie(this.selectedMovie);
                    if (!_.isEmpty(restoredParams)) {
                        this._router.parent.navigate(['Browse', this.getOriginalUrlParamsFromMovie(this.selectedMovie)]);
                    }
                    else {
                        this._router.parent.navigate(['Browse']);
                    }
                };
                FiltersComponent.prototype.getOriginalUrlParamsFromMovie = function (movie) {
                    return this._urlService.getRouteParamsFromMovieProps(movie.original, this._moviesService.defaultMovieJSON);
                };
                FiltersComponent.prototype.ngOnDestroy = function () {
                    this._subscriptions.forEach(function (sub) {
                        sub.unsubscribe();
                    });
                };
                FiltersComponent = __decorate([
                    core_1.Component({
                        selector: 'filters',
                        template: "\n    <div *ngIf=\"selectedMovie\">\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <h2>{{selectedMovie.title}}</h2>\n        </div>\n        <div class=\"col-sm-4\">\n          <button class=\"btn btn-primary\" \n            [class.disabled]=\"!selectedMovie.hasChanged\" \n            [disabled]=\"!selectedMovie.hasChanged\" (click)=\"restore()\">Restore</button>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <strong>Adult: </strong><span>{{selectedMovie.adult}}</span>\n          <button class=\"btn btn-primary\" (click)=\"toggleBool('adult', !selectedMovie.adult)\">Toggle</button>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <strong>Video: </strong><span>{{selectedMovie.video}}</span>\n          <button class=\"btn btn-primary\" (click)=\"toggleBool('video', !selectedMovie.video)\">Toggle</button>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <strong>Vote average: </strong><span>{{selectedMovie.vote_average}}</span>\n          <button class=\"btn btn-primary\">Toggle</button>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <strong>Vote count: </strong><span>{{selectedMovie.vote_count}}</span>\n          <button class=\"btn btn-primary\">Toggle</button>\n        </div>\n      </div>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [movies_service_1.MoviesService, url_service_1.UrlService, router_1.Router])
                ], FiltersComponent);
                return FiltersComponent;
            })();
            exports_1("FiltersComponent", FiltersComponent);
        }
    }
});
//# sourceMappingURL=filters.component.js.map