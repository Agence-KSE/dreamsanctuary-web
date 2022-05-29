import { createReducer, on } from '@ngrx/store';
import { UserStateModel } from './models/user.model';
import { UserActions } from './user.action';

export const initialState: UserStateModel = {
  user: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userLogin, (state, { user }) => {
    return {
      ...state,
      user,
    };
  })
);
