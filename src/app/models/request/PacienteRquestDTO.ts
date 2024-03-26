import { Usuario } from "../UsuarioDTO"

export class PacienteRequest {
    nombre: string
    apellidos: string
    nombreUsuario: string
    clave: string
    nss: string
    numTarjeta: string
    telefono: string
    direccion: string

    constructor(nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, nss?: string, numTarjeta?: string, telefono?: string, direccion?: string) {
        this.nombre = nombre || ''
        this.apellidos = apellidos || ''
        this.nombreUsuario = nombreUsuario || ''
        this.clave = clave || ''
        this.nss = nss || ''
        this.numTarjeta = numTarjeta || ''
        this.telefono = telefono || ''
        this.direccion = direccion || ''
    }
}