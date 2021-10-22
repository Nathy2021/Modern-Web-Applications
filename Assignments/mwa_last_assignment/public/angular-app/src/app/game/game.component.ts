import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';




import {GamesDataService} from '../games-data.service'
import {Game} from '../games-list/games-list.component'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

 
  
  title = "Games Details"
  game!:Games 
 
  @ViewChild("updateGame")
  updateGame!: NgForm;

  constructor(private gamesDataService: GamesDataService, private route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    let gameId = this.route.snapshot.params.gameId
    console.log("gameId: ", gameId);
    
    this.gamesDataService.getGame(gameId).then(response => this.game = response)
 
  }

  onUpdateGame(): void {
    let gameId = this.route.snapshot.params.gameId
    console.log("update form submitted");
    console.log("body ", this.updateGame.value);
    

    this.gamesDataService
      .updateGame(this.updateGame.value, gameId)
      .then((response) => (console.log(response)));

       window.location.reload();

  }

  onClear(): void {
    console.log("form submitted");
    this.updateGame.resetForm();
  }

 
    
  

  onDelete(){
    let gameId = this.route.snapshot.params.gameId
    this.gamesDataService.deleteGame(gameId).then(response => this.game = response)
    this._router.navigate(["/games"])
    
  }

}

export class Games {
  title!: string
  price!: number
  year!: number
  minPlayers!:number
  maxPlayers!:number
}
