import { Component } from '@angular/core';
import { from, Observable, switchMap, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database/database.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly auth: AngularFireAuth,
    private readonly databaseService: DatabaseService
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
    ).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (e) => console.error(e),
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((v: firebase.auth.UserCredential) => {
        return this.databaseService.addUser({
          id: v.user!.uid,
          username,
          email,
          aboutMe: '',
          phoneNumber: '',
          photoUrl: '',
        });
      })
    );
  }

  registerWithGoogle(): void {
    from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(
        switchMap((v: firebase.auth.UserCredential) => {
          return this.databaseService.addUser({
            id: v.user!.uid,
            username: v.user!.displayName!,
            email: v.user!.email!,
            aboutMe: '',
            phoneNumber: '',
            photoUrl: '',
          });
        }),
        tap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }

  showPassword(): void {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }
}
