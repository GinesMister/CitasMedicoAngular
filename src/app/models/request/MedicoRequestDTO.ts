export class MedicoRequest {
    nombre: string
    apellidos:string
    nombreUsuario: string
    clave: string
    numColegiado: string
    idsPaciente: Array<number>

    constructor(nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string, numColegiado?: string, idsPaciente?: Array<number>) {
        this.nombre = nombre || ''
        this.apellidos = apellidos || ''
        this.nombreUsuario = nombreUsuario || ''
        this.clave = clave || ''
        this.numColegiado = numColegiado || ''
        this.idsPaciente = idsPaciente || new Array<number>()
    }
}