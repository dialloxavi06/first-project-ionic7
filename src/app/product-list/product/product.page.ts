import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductServiceService } from 'src/app/product.service.service';
import { Product } from 'src/app/models/product.model';
import {Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  modif: boolean = false;
  product!: Product; 

  constructor(
    private alertCtrl : AlertController,
    private route: ActivatedRoute,
    private Product: ProductServiceService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() { 
    const id = this.route.snapshot.paramMap.get('id');
    this.Product.get(id).subscribe((value: any) => {
      this.product = value;
    });
  }

  async setModif() {
    if(!this.modif) {
      const alert = await this.alertCtrl.create({
        header : 'Etes vous sur de vouloir modifier ?',
        subHeader: 'Vous rendrez possible la modification',
        buttons : [
          {
            text: 'Annuler',
            role: 'Cancel'
          }, {
            text: 'Configurer',
            handler: () => {this.modif = !this.modif}
          }
        ]
      });
      await alert.present();
    } else {
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Vos modifications sont enregistrées',
      duration: 2000
    });
    (await toast).present();
  }

  onModif() {
    this.Product.update(this.product).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onDelete(id: any) {
    this.Product.delete(id);
    this.router.navigate(['/products']);
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
