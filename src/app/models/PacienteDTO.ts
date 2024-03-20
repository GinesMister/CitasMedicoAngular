import { Cita } from "./CitaDTO";
import { Usuario } from "./UsuarioDTO";

export class Paciente extends Usuario {
    nss: string
    numTarjeta: string
    telefono: string
    direccion: string
    arrCita: Array<Cita>

    constructor(id?: number, nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, nss?: string, numTarjeta?: string, telefono?: string, direccion?: string, arrCita?: Array<Cita>) {
        super(id, nombre, apellidos, nombre, clave)
        this.nss = nss || ''
        this.numTarjeta = numTarjeta || ''
        this.telefono = telefono || ''
        this.direccion = direccion || ''
        this.arrCita = arrCita || new Array<Cita>()
    }
}