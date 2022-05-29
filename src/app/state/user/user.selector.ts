import { AppStateModel } from '../models/state.model';
import { createSelector } from '@ngrx/store';

export const selectUser = (state: AppStateModel) => state.userState.user;
export const selectUsername = (state: AppStateModel) => state.userState.user?.username;

export const selectUserEmail = createSelector(selectUser, (selectedUser: any) => {
  return selectedUser.email;
});
