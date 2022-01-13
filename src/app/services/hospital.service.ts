import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  constructor( private http:HttpClient) { }
  
  get token():string {
    return localStorage.getItem('token') ||'';
  }


  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales(): Observable<Hospital[]>{
    //http://localhost:3000/api/usuarios?desde=5
    const url=`${ base_url }/hospitales`;
    return this.http.get<{ok:boolean,hospitales:Hospital[]}>(url, this.headers)
            .pipe(
              map((resp:{ ok:boolean, hospitales:Hospital[] })=>resp.hospitales)
            );
              
  }

  crearHospital(nombre:string){
    //http://localhost:3000/api/usuarios?desde=5
    const url=`${ base_url }/hospitales`;
    return this.http.post(url,{nombre}, this.headers);
            
              
  }
  
  actualizarHospital(_id:string,nombre:string){
    //http://localhost:3000/api/usuarios?desde=5
    const url=`${ base_url }/hospitales/${_id}`;
    return this.http.put(url,{nombre}, this.headers);
            
              
  }

  borrarHospital(_id:string){
    //http://localhost:3000/api/usuarios?desde=5
    const url=`${ base_url }/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
            
              
  }

}
