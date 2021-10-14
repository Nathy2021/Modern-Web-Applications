import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GamesListComponent } from './games-list/games-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OneGameComponent } from './one-game/one-game.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent,
    OneGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:"",
        component:WelcomeComponent
  },
  {
    path: "games",
    component: GamesListComponent
  },
  {
    path: "games/:gameId",
    component: OneGameComponent
  },
  {
    path:"**",
    component: ErrorPageComponent
  }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
