import { on } from '@ngrx/store';

import { RollDicePlayerAction, rollDicePlayerAction } from '../../../actions';
import { Lobby } from '../../../models';

export const lobbyGamePlayerReducerActions = [
    on(rollDicePlayerAction, (state: Lobby, { payload }: RollDicePlayerAction): Lobby => ({
        ...state,
        game: {
            ...state.game,
            playerTurnState: {
                ...state.game.playerTurnState,
                diceValue: payload.value,
            },
        },
    })),
];
