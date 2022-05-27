import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';
import firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database/database.service';
import { UserModel } from '../models/user.model';
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  passwordFieldTextType: boolean = false;
  isError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly router: Router,
    // private readonly store: Store,
    private readonly auth: AngularFireAuth,
    private readonly databaseService: DatabaseService
  ) {}

  onSubmit(): void {
    this.login(this.loginForm.value.email, this.loginForm.value.password).subscribe();
  }

  login(email: string, password: string): Observable<UserModel | FirebaseError> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential: any) => {
        return this.databaseService.getUser(userCredential.user.uid).pipe(
          tap((user: UserModel) => {
            // this.store.dispatch(
            //   UserActions.userLogin({
            //     user: user,
            //   })
            // );
            // this.router.navigate(['/profile']);
          })
        );
      }),
      catchError((error: FirebaseError) => {
        this.isError = true;
        this.loginForm.value.password = '';
        console.log(error.message);
        return of(error);
      })
    );
  }

  showPassword(): void {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }
}
