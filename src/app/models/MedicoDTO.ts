import { Cita } from "./CitaDTO";
import { Paciente } from "./PacienteDTO";
import { Usuario } from "./UsuarioDTO";

export class Medico extends Usuario {
    numColegiado: string
    Citas: Array<Cita>
    Pacientes: Array<Paciente>

    constructor(id?: number, nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, numColegiado?: string, Citas?: Array<Cita>, Pacientes?: Array<Paciente>) {
        super(id, nombre, apellidos, nombre, clave)
        this.numColegiado = numColegiado || ''
        this.Citas =  Citas || new Array()
        this.Pacientes = Pacientes || new Array()
    }
}