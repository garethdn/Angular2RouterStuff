import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Movie} from '../movies/Movie'
import {MoviesService} from '../movies/movies.service';
import {UrlService} from '../common/url.service'

@Component({
  selector: 'filters',
  template: `
    <div *ngIf="selectedMovie">
      <div class="row">
        <div class="col-sm-8">
          <h2>{{selectedMovie.title}}</h2>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-primary" 
            [class.disabled]="!selectedMovie.hasChanged" 
            [disabled]="!selectedMovie.hasChanged" (click)="restore()">Restore</button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong>Adult: </strong><span>{{selectedMovie.adult}}</span>
          <button class="btn btn-primary" (click)="toggleBool('adult', !selectedMovie.adult)">Toggle</button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong>Video: </strong><span>{{selectedMovie.video}}</span>
          <button class="btn btn-primary" (click)="toggleBool('video', !selectedMovie.video)">Toggle</button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong>Vote average: </strong><span>{{selectedMovie.vote_average}}</span>
          <button class="btn btn-primary">Toggle</button>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong>Vote count: </strong><span>{{selectedMovie.vote_count}}</span>
          <button class="btn btn-primary">Toggle</button>
        </div>
      </div>
    </div>
  `
})

export class FiltersComponent {
  public selectedMovie: Movie
  private _subscriptions: any[] = [];

  constructor(private _moviesService: MoviesService,
    private _urlService: UrlService,
    private _router: Router) { }

  ngOnInit() {
    this.selectedMovie = this._moviesService.getSelectedMovie();
    this.subscribeToSelectedMovie();
  }

  subscribeToSelectedMovie() {
    var sub = this._moviesService.selectedMovie.subscribe(movie => {
      this.selectedMovie = movie
    })
    this._subscriptions.push(sub);
  }

  toggleBool(attr, val) {
    var updatedUrlParams =  this._moviesService.defaultMovieJSON[attr] === val ?
      this._urlService.remove(attr) :
      this._urlService.add(attr, val);

    // this._router.parent.navigate(['Browse', { adult: true }]) 
    this._router.parent.navigate(['Browse', updatedUrlParams]) 
  }

  restore() {
    var restoredParams = this.getOriginalUrlParamsFromMovie(this.selectedMovie);

    if (!_.isEmpty(restoredParams)) {
      this._router.parent.navigate(['Browse', this.getOriginalUrlParamsFromMovie(this.selectedMovie)])
    } else {
      this._router.parent.navigate(['Browse'])
    }
  }

  getOriginalUrlParamsFromMovie(movie:Movie) {
    return this._urlService.getRouteParamsFromMovieProps(movie.original, this._moviesService.defaultMovieJSON);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }
}

