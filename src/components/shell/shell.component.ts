import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router, RouteParams, OnReuse, CanReuse, ComponentInstruction} from 'angular2/router';
import {MoviesService} from '../movies/movies.service';
import {Movie} from '../movies/Movie';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {FiltersComponent} from '../filters/filters.component';
import {UrlService} from '../common/url.service';

@Component({
  selector: 'shell.component.ts',
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-4"><sidebar></sidebar></div>
        <div class="col-sm-8"><filters></filters></div>
      </div>
    </div>
  `,
  directives: [SidebarComponent, FiltersComponent]
})

export class ShellComponent implements OnInit, OnDestroy {

  private _subscriptions: any[] = [];
  public selectedMovie: Movie;

  constructor(private _routeParams:RouteParams,
    private _moviesService: MoviesService,
    private _urlService: UrlService) { }

  ngOnInit() {
    this.subscribeToSelectedMovie();
    this._urlService.store(this._routeParams.params);
    this.setSelectedMovie(this._urlService.getMoviePropsFromRouteParams(this._routeParams.params, this._moviesService.defaultMovieJSON));
  }

  subscribeToSelectedMovie() {
    var sub = this._moviesService.selectedMovie.subscribe(movie => {
      this.selectedMovie = movie;
    })
    this._subscriptions.push(sub);
  }

  setSelectedMovie(params) {
    this._moviesService.setSelectedMovie(params);
  }

  routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
    // Always reuse the router
    return true;
  }

  routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
    this._urlService.store(next.params);
    this.setSelectedMovie(this._urlService.getMoviePropsFromRouteParams(next.params, this._moviesService.defaultMovieJSON));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

}