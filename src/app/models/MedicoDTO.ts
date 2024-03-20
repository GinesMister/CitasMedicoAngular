import { Cita } from "./CitaDTO";
import { Paciente } from "./PacienteDTO";
import { Usuario } from "./UsuarioDTO";

export class Medico extends Usuario {
    numColegiado: string
    arrCita: Array<Cita>
    arrPaciente: Array<Paciente>

    constructor(id?: number, nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, numColegiado?: string, arrCita?: Array<Cita>, arrPaciente?: Array<Paciente>) {
        super(id, nombre, apellidos, nombre, clave)
        this.numColegiado = numColegiado || ''
        this.arrCita =  arrCita || new Array()
        this.arrPaciente = arrPaciente || new Array()
    }
}