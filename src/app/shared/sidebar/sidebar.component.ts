import { Component} from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario!: Usuario;
  
  public menu:any;
  
  constructor( private sidebarService:SidebarService,
                private usuarioService: UsuarioService) { 
                  
    //this.imgUrl=usuarioService.usuario.imagenUrl;
    
    
  }

  ngOnInit(): void {
    this.usuario=this.usuarioService.usuario;
    this.menu=this.sidebarService.menu;
  }                                                                                                       
  

}