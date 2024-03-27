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

    parseDate(fechaHora: string | Date) {
        if (typeof fechaHora !== 'string') return fechaHora
        const result = new Date(fechaHora)
        return result
    }

    formatDate(date: Date): string {
        return `${date.getDate()}/
        ${date.getMonth()}/
        ${date.getFullYear()}
         - ${date.getHours()}:${date.getMinutes()}`
    }
}