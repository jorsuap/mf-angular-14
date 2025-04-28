import { NgModule, Injector, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: []
})
export class AppModule implements DoBootstrap {
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private router: Router
  ) {}


  ngDoBootstrap() {
    const element = createCustomElement(AppComponent, {
      injector: this.injector
    });
    customElements.define('mf-angular-14', element);


    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        this.router.initialNavigation();
      }
    });
}
}
