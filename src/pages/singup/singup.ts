import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuarios.service';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService) {

      this.formGroup = this.formBuilder.group({
        nome: ['jackson', [Validators.required]],
        telefone: ['8499999999', [Validators.required]],
        email: ['email@gmail.com', [Validators.required]],
        senha: ['123', [Validators.required]]
      });
  }

  insertUser() {
    this.usuarioService.insert(this.formGroup.value)
    .subscribe(Response => {
      this.showInsertOk();
    },
  error => {});
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
            this.navCtrl.setRoot('HomePage');
          }
        }
      ] 
    });
    alert.present();
  }
}
