import {Injectable} from 'angular2/core';
import {Movie} from './Movie';
import {Observable} from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';

declare var _: any;

@Injectable()
export class MoviesService {

  public movieKeys: string[]
  public movies: Movie[] = []
  public defaultMovieJSON: Object
  public selectedMovie: Observable<Movie>
  private _selectedMovie: Movie
  private _selectedMovieObserver: Observer<Movie>

  constructor() {
    this.initializeObservers();
    this.initializeMovies();
  }

  initializeMovies() {
    this.defaultMovieJSON = {
      'title': 'Default title',
      'release_date': '2000-01-01',
      'adult': false,
      'video': false,
      'vote_average': 0,
      'vote_count': 0,
      'id': 1
    };

    this.movies.push(new Movie(this.defaultMovieJSON));

    window['movies']['results'].forEach(movie => {
      this.movies.push(new Movie(movie))
    });


    this.movieKeys = _.keys(window['movies']['results'][0]);
  }

  initializeObservers() {
    this.selectedMovie = new Observable(observer => this._selectedMovieObserver = observer ).share();
  }

  getSelectedMovie():Movie {
    return this._selectedMovie;
  }

  setSelectedMovie(params) {
    params.id = params.id || 1;

    this._selectedMovie = _.findWhere(this.movies, { id: parseInt(params.id) });

    _.each(_.omit(params, 'id'), (val, key) => {
      this._selectedMovie[key] = val;
    })

    if (this._selectedMovie) {
      this._selectedMovie.hasChanged = !_.isEqual(this._selectedMovie.original, this._selectedMovie.getProps())      
      // console.log('Diff', this._selectedMovie.getChanges());
    }


    this._selectedMovieObserver.next(this._selectedMovie)
  }

}