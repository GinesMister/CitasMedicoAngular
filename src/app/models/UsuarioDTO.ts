export class Usuario {
    id: number
    nombre: string
    apellidos: string
    nombreUsuario: string
    clave: string

    constructor (id?: number, nombre?: string, apellidos?: string, nombreUsuario?: string, clave?: string) {
        this.id = id  || 0
        this.nombre = nombre || ''
        this.apellidos = apellidos || ''
        this.nombreUsuario = nombreUsuario || ''
        this.clave = clave || ''
    }
}