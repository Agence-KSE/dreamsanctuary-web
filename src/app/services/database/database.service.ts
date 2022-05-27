import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { from, map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DatabaseCollectionEnum } from './database.enum';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private userCollection: AngularFirestoreCollection<UserModel>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<UserModel>(DatabaseCollectionEnum.Users);
  }

  addUser(user: UserModel): Observable<void> {
    return from(this.userCollection.doc(user.id).set(user));
  }

  getUser(id: string): Observable<UserModel> {
    return this.userCollection
      .doc(id)
      .snapshotChanges()
      .pipe(map((value: any) => value.payload.data()));
  }
}
