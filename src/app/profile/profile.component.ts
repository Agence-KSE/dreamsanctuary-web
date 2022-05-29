import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateModel } from '../state/models/state.model';
import { selectUsername } from '../state/user/user.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  username$: any;

  constructor(private readonly store: Store<AppStateModel>) {}

  ngOnInit(): void {
    this.username$ = this.store.select(selectUsername);
  }
}
