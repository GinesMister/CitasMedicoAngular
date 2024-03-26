import { Diagnostico } from "./DiagnosticoDTO"

export class Cita {
    id: number
    fechaHora: Date
    motivoCita: string
    diagnostico: Diagnostico
    idMedico: number
    idPaciente: number

    constructor(id?: number, fechaHora?: Date, motivoCita?: string, diagnostico?: Diagnostico, idMedico?: number, idPaciente?: number) {
        this.id = id || 0
        this.fechaHora = fechaHora || new Date()
        this.motivoCita = motivoCita || ''
        this.diagnostico = diagnostico || new  Diagnostico()
        this.idMedico = idMedico || 0
        this.idPaciente = idPaciente || 0
    }
}