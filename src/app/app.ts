import { Component, signal } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header";
import { slideAnimation } from './animations/fade-animation';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterModule,RouterOutlet, Header],
  templateUrl: './app.html',
  animations: [slideAnimation],
})

export class App {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.url || '';
  }
}
