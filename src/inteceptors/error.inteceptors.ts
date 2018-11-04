import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FildMessage } from "../models/fildmessage";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alertCtrl: AlertController){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Error detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){

                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 422:
                this.handle422(errorObj);
                break;


                default:
                this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertCtrl.create({
            title: "Erro 401: falha na autenticação",
            message: "Email ou senha incorretas",
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "Ok"
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj){
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: "Ok"
                }
            ]
        });
        alert.present();
    }


    handleDefaultError(errroObj){
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errroObj.status + ' : '+errroObj.error,
            message: errroObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    
    }

    private listErrors(message : FildMessage[]) : string {
        let s : string = '';
        for (var i=0; i<message.length; i++){
            s = s + '<p><strong>' + message[i].fildName + "</strong>: " + message[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInteceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};