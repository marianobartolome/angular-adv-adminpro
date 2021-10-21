import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario{
    constructor(
        
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
        
    ){

    }

    // /upload/usuarios/no-image
    get imagenUrl(){
        if (!this.img) {
            return `${base_url}/upload/usuarios/no-image`;
        } else if(this.img?.includes('https')){   //incluye la direccion de l img de google
            return this.img;
        } else if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        } else{
            return `${base_url}/upload/usuarios/no-image`;
        }
        
    }
}