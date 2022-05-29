import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { userReducer } from './state/user/user.reducer';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, HomeComponent, LoginComponent, ProfileComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ userState: userReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
