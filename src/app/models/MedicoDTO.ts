import { Cita } from "./CitaDTO";
import { Paciente } from "./PacienteDTO";
import { Usuario } from "./UsuarioDTO";

export class Medico extends Usuario {
    numColegiado: string
    citas: Array<Cita>
    pacientes: Array<Paciente>

    constructor(id?: number, nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, numColegiado?: string, citas?: Array<Cita>, pacientes?: Array<Paciente>) {
        super(id, nombre, apellidos, nombre, clave)
        this.numColegiado = numColegiado || ''
        this.citas =  citas || new Array()
        this.pacientes = pacientes || new Array()
    }
}