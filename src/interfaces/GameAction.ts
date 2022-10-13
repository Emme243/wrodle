type IGameActionType =
  | 'ADD_PRESSED_LETTER'
  | 'BACKSPACE'
  | 'CHECK_HAS_LOST'
  | 'CHECK_HAS_WON'
  | 'INCREMENT_NUMBER_OF_GAMES'
  | 'INCREMENT_NUMBER_OF_VICTORIES'
  | 'RESET_GAME'
  | 'SET_IS_GAME_OVER'
  | 'SET_PRESSED_LETTERS'
  | 'SET_SELECTED_WORD'
  | 'SET_WORD_CATALOG';

export interface IGameAction {
  type: IGameActionType;
  payload?: any;
}
