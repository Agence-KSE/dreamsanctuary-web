import { Component } from '@angular/core';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database/database.service';
import firebase from 'firebase/compat/app';
import { UserModel } from '../models/user.model';
import { UserActions } from '../state/user/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly auth: AngularFireAuth,
    private readonly databaseService: DatabaseService,
    private readonly store: Store
  ) {}

  passwordFieldTextType: boolean = false;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    this.register(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password
    ).subscribe();
  }

  register(username: string, email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential: firebase.auth.UserCredential) => {
        this.databaseService.addUser({
          id: userCredential.user!.uid,
          username,
          email,
          aboutMe: '',
          phoneNumber: '',
          photoUrl: '',
        });
        return of(userCredential);
      }),
      switchMap((userCredential: firebase.auth.UserCredential) => {
        return this.databaseService.getUser(userCredential.user!.uid).pipe(
          tap((user: UserModel) => {
            this.store.dispatch(UserActions.userLogin({ user }));
            this.router.navigate(['/profile']);
          })
        );
      })
    );
  }

  registerWithGoogle(): void {
    from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(
        switchMap((userCredential: firebase.auth.UserCredential) => {
          this.databaseService.addUser({
            id: userCredential.user!.uid,
            username: userCredential.user!.displayName!,
            email: userCredential.user!.email!,
            aboutMe: '',
            phoneNumber: '',
            photoUrl: '',
          });
          return of(userCredential);
        }),
        switchMap((userCredential: firebase.auth.UserCredential) => {
          return this.databaseService.getUser(userCredential.user!.uid).pipe(
            tap((user: UserModel) => {
              this.store.dispatch(UserActions.userLogin({ user }));
              this.router.navigate(['/profile']);
            })
          );
        })
      )
      .subscribe();
  }

  showPassword(): void {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }
}
