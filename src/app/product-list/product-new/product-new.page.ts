import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductServiceService } from 'src/app/product.service.service';
import { Product } from 'src/app/models/product.model';
import {Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.page.html',
  styleUrls: ['./product-new.page.scss'],
})
export class ProductNewPage implements OnInit {
  public product!: Product;
  constructor( 
    private Product: ProductServiceService,
    private toastCtrl: ToastController,
    private router : Router
  ) { }

  ngOnInit() {
    this.product = new Product();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Nouveau Film enregistré',
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/films']);
      }, 2000);
    });
  }

  add() {
    this.Product.saveNewProduct(this.product).subscribe(() => {
      this.product = new Product();
      this.presentToast();
    });
  }

  async addNewPhoto(type: string) {
    let image: string | undefined;
    if (type === 'library') {
      console.log(type);
      image = await this.openLibrary();
    } else {
      console.log(type);
      const cameraImage = await this.openBibliotheque();
      if (cameraImage !== null) {
        image = cameraImage;
      } 
    }
  
    if (image !== undefined) {
      this.product.pictureLink = image;
    } 
  }

  async openLibrary(){
    const options = {
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      width: 1000,
      height: 1000
    };
    const capture = await Camera.getPhoto(options);
    return capture.webPath;
  }
  async openBibliotheque() {
    try {
      const options = {
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        width: 1000,
        height: 1000
      };
      const capture = await Camera.getPhoto(options);
      return capture.webPath;
    } catch (error) {
      console.error('Error accessing camera:', error);
      return null;
    }
  }

}
