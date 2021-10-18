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
  public imgUrl='';

  menuItems: any[] = [];
  constructor( private sidebarSettings:SidebarService,
                private usuarioService: UsuarioService) { 
                  
    //this.imgUrl=usuarioService.usuario.imagenUrl;
    this.usuario=usuarioService.usuario;
    this.menuItems=sidebarSettings.menu;
    
  }

  

}
