import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservaService } from '../../services/domain/reserva.service';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-inserir-reserva',
  templateUrl: 'inserir-reserva.html',
})
export class InserirReservaPage {

  formGroup: FormGroup;
  codReserva: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public reservaService: ReservaService,
    public alertCtrl: AlertController,
    public auth: AuthService) {
  
  this.formGroup = this.formBuilder.group({
    descricao: ['aula de radio', [Validators.required]],
    dataDaReserva: ['30/11/2018 08:00', [Validators.required]],
    dataFinalDaReserva: ['30/11/2018 10:00', [Validators.required]],
    nomeDoSolicitante: ['lendro', [Validators.required]],
    contatoSolicitante: ['9898989898', [Validators.required]],
    emailSolicitante: ['leandro@gmail.com', [Validators.required]]
  });

}

  insertReserva() {
    this.reservaService.insert(this.formGroup.value)
    .subscribe(response => {
      this.showInsertOk();
    },
    error => {
      if (error.status == 403) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot('ResevarPage');
          }
        }
      ] 
    });
    alert.present();
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
