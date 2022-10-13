type IGameActionType =
  | 'CHECK_HAS_WON'
  | 'CHECK_HAS_LOST'
  | 'SET_SELECTED_WORD'
  | 'SET_PRESSED_LETTERS'
  | 'SET_WORD_CATALOG'
  | 'ADD_PRESSED_LETTER'
  | 'RESET_GAME'
  | 'INCREMENT_NUMBER_OF_GAMES'
  | 'INCREMENT_NUMBER_OF_VICTORIES'
  | 'SET_IS_GAME_OVER'
  | 'BACKSPACE';

export interface IGameAction {
  type: IGameActionType;
  payload?: any;
}
