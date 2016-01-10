import {Component, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {Movie} from '../movies/Movie'
import {MoviesService} from '../movies/movies.service';
import {UrlService} from '../common/url.service';

@Component({
    selector: 'sidebar',
    template: `
      <h2>Movies</h2>
      <ul class="nav">
        <li *ngFor="#movie of movies" [class.active]="selectedMovie && selectedMovie.id == movie.id">
          <a (click)="setSelectedMovie(movie)" [class.text-danger]="movie.hasChanged">
            {{movie.title}}
            <strong *ngIf="movie.hasChanged">*</strong>
          </a>
        </li>
      </ul>
    `,
    styles: [`
      .nav>li.active>a {
          background-color: #ecf0f1;
          font-weight: bold;
      }
    `]
})

export class SidebarComponent implements OnDestroy {

  public selectedMovie:Movie
  public movies:Movie[] = []
  private _subscriptions: any[] = [];

  constructor(private _moviesService: MoviesService,
    private _urlService: UrlService,
    private _router:Router) { }

  ngOnInit() {
    this.movies = this._moviesService.movies;
    this.selectedMovie = this._moviesService.getSelectedMovie();
    this.subscribeToSelectedMovie();
  }

  subscribeToSelectedMovie() {
    var sub = this._moviesService.selectedMovie.subscribe(movie => {
      this.selectedMovie = movie
    })
    this._subscriptions.push(sub);
  }

  setSelectedMovie(movie:Movie) {
    this._router.parent.navigate(['Browse', this.getUrlParamsFromMovie(movie)])
  }

  getUrlParamsFromMovie(movie:Movie) {
    var params = this._urlService.getRouteParamsFromMovieProps(movie.getProps(), this._moviesService.defaultMovieJSON);

    return params;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

}