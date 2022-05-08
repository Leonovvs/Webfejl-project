import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private firestore: AngularFirestore) { }

  create(user: User){
    return this.firestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.firestore.collection<User>(this.collectionName).valueChanges();
  }

  getAllOrderByEmail(){
    return this.firestore.collection<User>(this.collectionName, ref => ref.orderBy("email", "asc"));
  }

  getById(id: string) {
    return this.firestore.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  getUserByEmail(email: string) {
    return this.firestore.collection<User>(this.collectionName, ref => ref.where("email", "==", email).limit(1));
  }

  delete(id: string){
    return this.firestore.collection<User>(this.collectionName).doc(id).delete();
  }

  update(user: User){
    return this.firestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }
}
