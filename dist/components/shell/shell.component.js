System.register(['angular2/core', 'angular2/router', '../movies/movies.service', '../sidebar/sidebar.component', '../filters/filters.component', '../common/url.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, movies_service_1, sidebar_component_1, filters_component_1, url_service_1;
    var ShellComponent;
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
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (filters_component_1_1) {
                filters_component_1 = filters_component_1_1;
            },
            function (url_service_1_1) {
                url_service_1 = url_service_1_1;
            }],
        execute: function() {
            ShellComponent = (function () {
                function ShellComponent(_routeParams, _moviesService, _urlService, _router) {
                    this._routeParams = _routeParams;
                    this._moviesService = _moviesService;
                    this._urlService = _urlService;
                    this._router = _router;
                    this._subscriptions = [];
                }
                ShellComponent.prototype.ngOnInit = function () {
                    console.info('Params', this._routeParams.params);
                    this.subscribeToSelectedMovie();
                    this._urlService.store(_.clone(this._routeParams.params, this));
                    this.setSelectedMovie(this._urlService.getMoviePropsFromRouteParams(this._routeParams.params, this._moviesService.defaultMovieJSON));
                };
                ShellComponent.prototype.subscribeToSelectedMovie = function () {
                    var _this = this;
                    var sub = this._moviesService.selectedMovie.subscribe(function (movie) {
                        _this.selectedMovie = movie;
                    });
                    this._subscriptions.push(sub);
                };
                ShellComponent.prototype.setSelectedMovie = function (params) {
                    this._moviesService.setSelectedMovie(params);
                };
                ShellComponent.prototype.routerCanReuse = function (next, prev) {
                    // Always reuse the router
                    return true;
                };
                ShellComponent.prototype.routerOnReuse = function (next, prev) {
                    console.info('Params', next.params);
                    this._urlService.store(_.clone(next.params, true));
                    this.setSelectedMovie(this._urlService.getMoviePropsFromRouteParams(next.params, this._moviesService.defaultMovieJSON));
                };
                ShellComponent.prototype.ngOnDestroy = function () {
                    this._subscriptions.forEach(function (sub) {
                        sub.unsubscribe();
                    });
                };
                ShellComponent = __decorate([
                    core_1.Component({
                        selector: 'shell.component.ts',
                        template: "\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-sm-4\"><sidebar></sidebar></div>\n        <div class=\"col-sm-8\"><filters></filters></div>\n      </div>\n    </div>\n  ",
                        directives: [sidebar_component_1.SidebarComponent, filters_component_1.FiltersComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, movies_service_1.MoviesService, url_service_1.UrlService, router_1.Router])
                ], ShellComponent);
                return ShellComponent;
            })();
            exports_1("ShellComponent", ShellComponent);
        }
    }
});
//# sourceMappingURL=shell.component.js.map