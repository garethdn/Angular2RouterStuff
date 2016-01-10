declare var _: any;

export class Movie {

  adult: Boolean
  id: number
  release_date: string
  title: string
  video: Boolean
  vote_average: number
  vote_count: number

  original: Object
  hasChanged: Boolean = false

  constructor(options?:Object) {
    _.each(options, (val, key) => {
      this[key] = val
    })

    this.original = options;
  }

  restore() {
    _.each(this.original, (val, key) => {
      this[key] = val;
    })

    this.hasChanged = false;
  }

  getProps() {
    var props = {};

    _.each(this.original, (val, key) => {
      props[key] = this[key];
    })

    return props;
  }

  getChanges() {
    var currentProps = this.getProps();

    return _.reduce(this.original, function(result, value, key) {
      return _.isEqual(value, currentProps[key]) ?
          result : result.concat(key, value, currentProps[key]);
    }, []);
  }

}