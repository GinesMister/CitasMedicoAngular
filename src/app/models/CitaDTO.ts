import { Diagnostico } from "./DiagnosticoDTO"

export class Cita {
    id: number
    fechaHora: Date
    motivoCita: string
    diagnostico: Diagnostico

    constructor(id?: number, fechaHora?: Date, motivoCita?: string, diagnostico?: Diagnostico) {
        this.id = id || 0
        this.fechaHora = fechaHora || new Date()
        this.motivoCita = motivoCita || ''
        this.diagnostico = diagnostico || new  Diagnostico()
    }
}