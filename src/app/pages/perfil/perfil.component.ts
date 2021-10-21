import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  //styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {



  
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp:any='';
  
  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
    

  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre, Validators.required],
      email:[this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil (){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(()=>{
        const{nombre,email} = this.perfilForm.value;
        this.usuario.nombre=nombre;
        this.usuario.email=email;
        Swal.fire('Guardado', 'Cambios fueron guardados','success');
      },(err)=>{
        Swal.fire('Error en guardado', err.error.msg,'error')
        
      });
  }

  cambiarImagen(file:any):any{
    const imagen=file?.target?.files[0];
    //this.imagenSubir = event.target.files[0];
    //console.log(this.imagenSubir);
    this.imagenSubir=imagen;
    //console.log();
    if(!imagen){
       return this.imgTemp=null; 
    }
    const reader=new FileReader();
    reader.readAsDataURL(imagen);
    reader.onloadend=()=>{
      this.imgTemp=reader.result;
      console.log(reader.result);
    }
    
  }

  subirImagen(){
    this.fileUploadService
      .actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid!)
      .then(img=>{ 
        this.usuario.img=img;
        Swal.fire('Guardado', 'Imagen actualizada','success');
      }).catch(err=>{
        console.log(err);
        Swal.fire('Error en guardado', 'No se pudo subir la imagen');
      });
      
      
  }
}
