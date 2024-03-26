import { Cita } from "./CitaDTO";
import { Paciente } from "./PacienteDTO";
import { Usuario } from "./UsuarioDTO";
import { MedicoRequest } from "./request/MedicoRequestDTO";

export class Medico extends Usuario {
    numColegiado: string
    citas: Array<Cita>
    pacientes: Array<Paciente>

    constructor(id?: number, nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, numColegiado?: string, citas?: Array<Cita>, pacientes?: Array<Paciente>) {
        super(id, nombre, apellidos, nombreUsuario, clave)
        this.numColegiado = numColegiado || ''
        this.citas =  citas || new Array()
        this.pacientes = pacientes || new Array()
    }

    toRequest(): MedicoRequest {
        const mr = new MedicoRequest(this.nombre, this.apellidos, this.nombreUsuario, this.clave, this.numColegiado)
        this.pacientes.forEach(p => {
            mr.idsPaciente.push(p.id)
        })
        return mr
    }
}