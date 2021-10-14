import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-one-game',
  templateUrl: './one-game.component.html',
  styleUrls: ['./one-game.component.css']
})
export class OneGameComponent implements OnInit {
  title = "Information about Game ";

  game!:Game;
  gameId!: string;

  constructor(private gameDataService:GamesDataService, private _Activatedroute:ActivatedRoute) { }



ngOnInit(): void {

this._Activatedroute.paramMap.subscribe(params => {

this.gameId = String(params.get("gameId"));

})
this.gameDataService.getGame(this.gameId).then(response=>this.game=response);

}
}