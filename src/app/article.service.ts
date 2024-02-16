import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class ArticleService {
  constructor(private firestore: AngularFirestore) { }

  getArticleCount() {
    return this.firestore.collection('product').snapshotChanges().pipe(
      map(actions => actions.length)
    );
  }
}