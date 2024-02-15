import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Product } from './models/product.model';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private dbPath = '/product';
  productRef: AngularFirestoreCollection<Product>;


  constructor(
    private db: AngularFirestore
  ) { 
    this.productRef = db.collection(this.dbPath);
  }

  getAll() : any {
    return this.productRef.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  saveNewProduct(film: Product) : any {
    return new Observable(obs => {
      this.productRef.add({...film}).then(() => {
        obs.next();
      });
    });
  }

  get(id: any):any {
    return  new Observable(obs => {
      this.productRef.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(product:Product) {
    return new Observable(obs => {
      this.productRef.doc(product.id).update(product);
      obs.next();
    });
  }

  delete(id: any) {
    this.db.doc(`products/${id}`).delete();
  }
}
 