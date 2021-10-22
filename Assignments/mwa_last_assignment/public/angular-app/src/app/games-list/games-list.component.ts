import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GamesDataService } from "../games-data.service";

@Component({
  selector: "app-games-list",
  templateUrl: "./games-list.component.html",
  styleUrls: ["./games-list.component.css"],
})
export class GamesListComponent implements OnInit {
  @ViewChild("registerGame")
  registerGame!: NgForm;
  games: Game[] = [];
  game!: Game;

  offset:number = 0
 x1:any="<<"
 x2:any=">>"
  constructor(private gamesDataService: GamesDataService) {}

  ngOnInit(): void {
    this.gamesDataService
      .getGames(this.offset)
      .then((response) => (this.games = response));
  }

  onAddGame(): void {
    console.log("form submitted");
    console.log("body ", this.registerGame.value);
    

    this.gamesDataService
      .addGame(this.registerGame.value)
      .then((response) => (console.log(response)));
      window.location.reload();
  }

  onClear(): void {
    console.log("form submitted");
    this.registerGame.resetForm();
  }

  onPrevious() : void {
    this.offset = this.offset - 3;
    if(this.offset <=0) this.offset = 0;
    this.gamesDataService.getGames(this.offset)
 .then((response) => (this.games = response));
  }
  onNext() : void {
    this.offset = this.offset +  3;    
    this.gamesDataService.getGames(this.offset)
    .then((response) => (this.games = response));
    const jobObj = JSON.parse(JSON.stringify(this.games));
      if (jobObj.length < 3) this.offset = 0;
  }
   
}
export class Game {
  _id!: string;
  title!: string;
  price!: number;
  year!: number;
  minPlayers!: number;
  maxPlayers!: number;
}

// export class User {
//   username!: string;
//   password!: string;
  
// }
