import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public totalMedicos: number=0;
  public medicos: Medico[]=[];
  public cargando: boolean=true;
  public medicosTemp:Medico[]=[];
  //modalImagenService: any;
  public imgSubs!:Subscription;

  constructor(private medicoService:MedicoService,
    private modalImagenService:ModalImagenService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarMedicos();
      this.imgSubs=this.modalImagenService.nuevaImagen
      .pipe(delay(500))    
      .subscribe(img=> this.cargarMedicos());
  }

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe()
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos()
            .subscribe(medicos=>{
          
          this.cargando=false;
          this.medicos=medicos;
          this.medicosTemp=medicos;
        })
  }

  eliminarMedico(medico:Medico){
    
    return Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta por borrar a ${ medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
       
       this.medicoService.borrarMedico(medico._id!)
          .subscribe( _resp => {
            this.cargarMedicos();
            Swal.fire(
              'Médico borrado', 
              `${medico.nombre} se ha borrado correctamente`,
              'success'
            );
          });
          
      }
    })
  }

  abrirModal(medico:Medico){
    //console.log(hospital);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino:string){
    console.log(this.medicosTemp);
    if (termino.length===0) {
      return this.cargarMedicos();
    } 
      return this.busquedasService.buscar('medicos',termino)
          .subscribe( resultados=> {
            //console.log(resultados);
            this.medicos=resultados;
      });
  }

}
