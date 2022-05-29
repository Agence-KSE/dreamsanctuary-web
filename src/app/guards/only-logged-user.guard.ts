import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppStateModel } from '../state/models/state.model';
import { selectUser } from '../state/user/user.selector';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private readonly store: Store<AppStateModel>, private readonly router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
