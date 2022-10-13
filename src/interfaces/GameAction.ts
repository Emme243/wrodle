type IGameActionType =
  | 'SET_HAS_WON'
  | 'SET_HAS_LOST'
  | 'SET_SELECTED_WORD'
  | 'SET_PRESSED_LETTERS'
  | 'SET_WORD_CATALOG'
  | 'ADD_PRESSED_LETTER'
  | 'RESET_GAME';

export interface IGameAction {
  type: IGameActionType;
  payload?: any;
}
