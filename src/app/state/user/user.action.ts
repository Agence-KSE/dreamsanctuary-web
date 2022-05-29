import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export namespace UserActions {
  export const userLogin = createAction('[User] User Login', props<{ user: UserModel }>());
}
