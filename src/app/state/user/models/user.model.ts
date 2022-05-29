import { UserModel } from '../../../models/user.model';

export interface UserStateModel {
  user: UserModel | undefined;
}
