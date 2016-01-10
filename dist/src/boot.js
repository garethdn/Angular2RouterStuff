System.register(['angular2/platform/browser', 'angular2/http', 'angular2/router', './components/app/app.component', './components/movies/movies.service', 'rxjs/add/operator/map', 'rxjs/add/operator/toPromise'], function(exports_1) {
    var browser_1, http_1, router_1, app_component_1, movies_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (movies_service_1_1) {
                movies_service_1 = movies_service_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                movies_service_1.MoviesService
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map