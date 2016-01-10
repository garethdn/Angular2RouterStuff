import {Injectable} from 'angular2/core';

declare var _: any;

@Injectable()
export class UrlService {

  private params: Object = {}

  constructor() { }

  store(params) {
    this.params = params;
  }

  getParam(key) {
    return this.params[key];
  }

  getAll() {
    return this.params;
  }

  add(key, val, include: Boolean = true) {
    this.params[key] = include ? val : '-' + val;

    if (!this.params[key]) { this.remove(key) }

      return this.params;
  }

  remove(key) {
    if (_.has(this.params, key)) {
      delete this.params[key];
    }
    return this.params;
  }

  addMultiple(options) {
    _.each(options, (val, key) => {
      this.add(key, val);
    })
    return this.params;
  }

  toggle(key, val, include: Boolean = true): Object {
    val = val.toString();
    // If the key exists in the param object, create array from string value
    var values = this.params[key] ? this.params[key].split(',') : [];

    if (include) {
      values = this.toggleInclude(key, val, values);
    } else {
      values = this.toggleExclude(key, val, values);
    }

    // Convert the array back to a string
    this.params[key] = values.join();

    // If the key has no value, remove it from the params
    if (!this.params[key]) {
      this.remove(key);
    }

    return this.params;
  }

  toggleInclude(key, val, values: any[]): any[] {
    // Automatically undo any exclusion for this key
    values = _.without(values, '-' + val);
    
    // If value already exists in params, remove it
    if (_.contains(values, val)) {
      values = _.without(values, val);
    } else {
      values.push(val);
    }

    return values;
  }

  toggleExclude(key, val, values: any[]): any[] {
    // Automatically remove any inclusive value for this key
    values = _.without(values, val);
    
    // If negative value already exists in params, remove it
    if (_.contains(values, '-' + val)) {
      values = _.without(values, '-' + val);
    } else {
      values.push('-' + val);
    }

    return values;
  }

  extend(params) {
    return _.extend({}, this.params, params);
  }

  getRouteParamsFromMovieProps(movieProps, defaultMovie) {
    var routeParams = {};

    _.each(movieProps, (val, key) => {
      if (!_.isEqual(val, defaultMovie[key])) {
        routeParams[key] = val;
      }
    })

    return routeParams;
  }

  getMoviePropsFromRouteParams(routeParams, defaultMovie) {
    var movieParams = {};

    _.each(defaultMovie, (val, key) => {
      if (routeParams[key]) {
        movieParams[key] = decodeURIComponent(routeParams[key]);
      } else {
        movieParams[key] = val;
      }

      if (key === 'adult' || key === 'video') {
        if (routeParams[key])
          movieParams[key] = routeParams[key] === "true" || routeParams[key] === true;
      }

      if (key === 'vote_average') {
        if (routeParams[key])
          movieParams[key] = parseFloat(routeParams[key]);
      }

      if (key === 'id' || key === 'vote_count') {
        if (routeParams[key])
          movieParams[key] = parseInt(routeParams[key], 10);
      }

    })

    return movieParams;
  }

}