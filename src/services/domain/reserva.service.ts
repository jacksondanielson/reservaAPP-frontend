import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ReservaDTO } from "../../models/reserva.dto";
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ReservaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable <ReservaDTO[]>{
        return this.http.get<ReservaDTO[]>(`${API_CONFIG.baseUrl}/resevasDaSalaC`);
    }

    
    insert(obj : ReservaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/resevasDaSalaC`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

}