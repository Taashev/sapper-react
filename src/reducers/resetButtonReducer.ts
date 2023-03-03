import { IResetButton } from '../interface/IResetButton';

export const resetButtonInitialState: IResetButton = {
  resetButtonImgPosition: 0,
};

export const resetButtonReducer = function (state: IResetButton, action: any) {
  switch (action.type) {
    case 'smile':
      return { ...state, resetButtonImgPosition: 0 };
    case 'press':
      return { ...state, resetButtonImgPosition: 55 };
    case 'winner':
      return { ...state, resetButtonImgPosition: 164 };
    case 'lost':
      return { ...state, resetButtonImgPosition: 219 };
    case 'wow':
      return { ...state, resetButtonImgPosition: 110 };
    default:
      return { ...state };
  }
};
