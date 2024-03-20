export class Diagnostico {
    id: number
    valoracionEspecialista: string
    enfermedad: string

    constructor(id?: number, valracionEspecialista?: string, enfermedad?: string) {
        this.id = id || 0;
        this.valoracionEspecialista = valracionEspecialista || ''
        this.enfermedad = enfermedad || ''
    }
}