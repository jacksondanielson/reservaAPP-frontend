import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ReservaService } from '../../services/domain/reserva.service';
import { ReservaDTO } from '../../models/reserva.dto';


@IonicPage()
@Component({
  selector: 'page-resevar',
  templateUrl: 'resevar.html',
})
export class ResevarPage {

  items: ReservaDTO[] = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public reservaService : ReservaService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let loader = this.presentLoading();
    this.reservaService.findAll()
    .subscribe(response => {
      this.items = response;
      loader.dismiss();
    },
    error =>{
      loader.dismiss();
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
