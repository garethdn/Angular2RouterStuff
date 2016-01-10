import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './components/app/app.component';
import {MoviesService} from './components/movies/movies.service'
import {UrlService} from './components/common/url.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  MoviesService,
  UrlService
]);