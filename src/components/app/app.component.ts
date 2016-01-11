import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet, Route, Router} from 'angular2/router';
import {ShellComponent} from '../shell/shell.component';

@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [RouterOutlet]
})

@RouteConfig([
  new Route({ path: '/', component: ShellComponent, name: 'Browse' })
])

export class AppComponent {}