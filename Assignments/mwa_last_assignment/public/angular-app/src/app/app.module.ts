import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GamesListComponent } from './games-list/games-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameComponent } from './game/game.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GamesListComponent,
    GameComponent,
    FooterComponent,
    RegisterUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:"",
        component:RegisterUserComponent
  },
  {
    path: "games",
    component: GamesListComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "games/:gameId",
    component: GameComponent
  },
  {
    path: "register",
    component: RegisterUserComponent
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
