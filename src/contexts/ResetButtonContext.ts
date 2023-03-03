import { createContext, Dispatch } from 'react';
import { IResetButton } from '../interface/IResetButton';

interface IResetButtonContext {
  resetButtonState: IResetButton;
  resetButtonDispatch: Dispatch<any>;
}

export const ResetButtonContext = createContext({} as IResetButtonContext);
