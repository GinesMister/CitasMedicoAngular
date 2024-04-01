export class Diagnostico {
    id: number | null
    valoracionEspecialista: string
    enfermedad: string

    constructor(id?: number, valracionEspecialista?: string, enfermedad?: string) {
        this.id = id || null
        this.valoracionEspecialista = valracionEspecialista || ''
        this.enfermedad = enfermedad || ''
    }
}