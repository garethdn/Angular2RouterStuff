System.register(['angular2/core', 'angular2/router', '../movies/movies.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, movies_service_1;
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
            }],
        execute: function() {
            FiltersComponent = (function () {
                function FiltersComponent(_moviesService, _router) {
                    this._moviesService = _moviesService;
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
                        console.log('Movie changes - FILTERS');
                        _this.selectedMovie = movie;
                    });
                    this._subscriptions.push(sub);
                };
                FiltersComponent.prototype.ngOnDestroy = function () {
                    this._subscriptions.forEach(function (sub) {
                        sub.unsubscribe();
                    });
                };
                FiltersComponent = __decorate([
                    core_1.Component({
                        selector: 'filters',
                        template: "\n    <div *ngIf=\"selectedMovie\">\n      <ul>\n        <li *ngFor=\"#prop of selectedMovie\">\n          {{prop | json}}\n        </li>\n      </ul>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [movies_service_1.MoviesService, router_1.Router])
                ], FiltersComponent);
                return FiltersComponent;
            })();
            exports_1("FiltersComponent", FiltersComponent);
        }
    }
});
//# sourceMappingURL=filters.component.js.map