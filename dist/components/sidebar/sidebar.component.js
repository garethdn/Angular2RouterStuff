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
    var SidebarComponent;
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
            SidebarComponent = (function () {
                function SidebarComponent(_moviesService, _urlService, _router) {
                    this._moviesService = _moviesService;
                    this._urlService = _urlService;
                    this._router = _router;
                    this.movies = [];
                    this._subscriptions = [];
                }
                SidebarComponent.prototype.ngOnInit = function () {
                    this.movies = this._moviesService.movies;
                    this.selectedMovie = this._moviesService.getSelectedMovie();
                    this.subscribeToSelectedMovie();
                };
                SidebarComponent.prototype.subscribeToSelectedMovie = function () {
                    var _this = this;
                    var sub = this._moviesService.selectedMovie.subscribe(function (movie) {
                        _this.selectedMovie = movie;
                    });
                    this._subscriptions.push(sub);
                };
                SidebarComponent.prototype.setSelectedMovie = function (movie) {
                    this._router.parent.navigate(['Browse', this.getUrlParamsFromMovie(movie)]);
                };
                SidebarComponent.prototype.getUrlParamsFromMovie = function (movie) {
                    var params = this._urlService.getRouteParamsFromMovieProps(movie.getProps(), this._moviesService.defaultMovieJSON);
                    return params;
                };
                SidebarComponent.prototype.ngOnDestroy = function () {
                    this._subscriptions.forEach(function (sub) {
                        sub.unsubscribe();
                    });
                };
                SidebarComponent = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                        template: "\n      <h2>Movies</h2>\n      <ul class=\"nav\">\n        <li *ngFor=\"#movie of movies\" [class.active]=\"selectedMovie && selectedMovie.id == movie.id\">\n          <a (click)=\"setSelectedMovie(movie)\" [class.text-danger]=\"movie.hasChanged\">\n            {{movie.title}}\n            <strong *ngIf=\"movie.hasChanged\">*</strong>\n          </a>\n        </li>\n      </ul>\n    ",
                        styles: ["\n      .nav>li.active>a {\n          background-color: #ecf0f1;\n          font-weight: bold;\n      }\n    "]
                    }), 
                    __metadata('design:paramtypes', [movies_service_1.MoviesService, url_service_1.UrlService, router_1.Router])
                ], SidebarComponent);
                return SidebarComponent;
            })();
            exports_1("SidebarComponent", SidebarComponent);
        }
    }
});
//# sourceMappingURL=sidebar.component.js.map