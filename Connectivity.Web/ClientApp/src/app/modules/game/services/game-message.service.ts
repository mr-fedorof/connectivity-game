import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import {
    nextPlayerGameSysAction,
    RollDicePlayerAction,
    rollDicePlayerAction,
    skipMovePlayerAction,
    startGameSysAction,
} from '../actions';
import { GameMessage, Lobby, Player, Team } from '../models';

@Injectable()
export class GameMessageService {
    private readonly _messageSubject = new Subject<GameMessage>();

    public get messages$(): Observable<GameMessage> {
        return this._messageSubject.asObservable();
    }

    public pushAction(action: Action, lobby: Lobby): void {
        const gameMessage = this.compileGameMessage(action, lobby);
        if (!gameMessage) {
            return;
        }

        this._messageSubject.next(gameMessage);
    }

    private compileGameMessage(action: Action, lobby: Lobby): GameMessage {
        const player: Player = !!lobby.game?.playerTurnId
            ? lobby.players.find(p => p.id === lobby.game.playerTurnId)
            : null;
        const team: Team = !!player
            ? lobby.teams.find(t => t.id === player.teamId)
            : null;

        switch (action.type) {
            case startGameSysAction.type:
            case nextPlayerGameSysAction.type:
                return new GameMessage(
                    'GAME_MESSAGES.PLAYER_TURN',
                    {
                        player: player.name,
                        team: team.name,
                    },
                    action.createdAt
                );

            case skipMovePlayerAction.type:
                return new GameMessage(
                    'GAME_MESSAGES.PLAYER_SKIPPED_THE_TURN',
                    {
                        player: player.name,
                        team: team.name,
                    },
                    action.createdAt
                );

            case rollDicePlayerAction.type:
                return new GameMessage(
                    'GAME_MESSAGES.PLAYER_ROLLED_THE_DICE',
                    {
                        player: player.name,
                        team: team.name,
                        value: (action as RollDicePlayerAction).payload.value,
                    },
                    action.createdAt
                );
            default:
                return null;
        }
    }
}
