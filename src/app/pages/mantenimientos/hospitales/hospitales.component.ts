import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public totalHospitales: number=0;
  public hospitales: Hospital[]=[];
  public cargando: boolean=true;
  public hospitalesTemp:Hospital[]=[];
  //modalImagenService: any;
  public imgSubs!:Subscription;


  constructor( private hospitalService:HospitalService,
                private modalImagenService:ModalImagenService,
                private busquedasService: BusquedasService) { }
  
  ngOnDestroy(): void {
      this.imgSubs.unsubscribe()
  }
  ngOnInit(): void {
      this.cargarHospitales();
      this.imgSubs=this.modalImagenService.nuevaImagen
      .pipe(delay(500))    
      .subscribe(img=> this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.cargarHospitales()
        .subscribe(hospitales=>{
          
          this.cargando=false;
          this.hospitales=hospitales;
          this.hospitalesTemp=hospitales;
        })
  }

  guardarCambios(hospital:Hospital){
    
    
    //this.cargando=true;
    this.hospitalService.actualizarHospital(hospital._id!,hospital.nombre)
        .subscribe(resp=>{
          Swal.fire('Actualizado', hospital.nombre,'success')
          /*
          this.cargando=false;
          this.hospitales=hospitales;*/
        })
  }

  eliminarHospital(hospital:Hospital){
    
    
    //this.cargando=true;
    this.hospitalService.borrarHospital(hospital._id!)
        .subscribe(resp=>{
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.nombre,'success')
          /*
          this.cargando=false;
          this.hospitales=hospitales;*/
        })
  }

  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital'
    })
    
    if(value.trim().length>0){
      this.hospitalService.crearHospital(value)
      .subscribe((resp:any)=>{
        this.hospitales.push(resp.hospital)
        //this.cargarHospitales();
         Swal.fire('Creado', '','success')
      })
    }
  }

  abrirModal(hospital:Hospital){
    //console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino:string){
    console.log(this.hospitalesTemp);
    if (termino.length===0) {
      return this.cargarHospitales();
    } 
      return this.busquedasService.buscar('hospitales',termino)
          .subscribe( resultados=> {
            //console.log(resultados);
            this.hospitales=resultados;
      });
      
  }

}
