import { useState } from 'react'
// HOOK PERSONZALIDO REUTILIZABLE - Custom Hook
export const useClasesInput = (initialValue = '') => {
  const [clase, setClase] = useState(initialValue)
  const [advertencia, setAdvertencia] = useState(initialValue)
  // valida cualquier input

  // si comprobar es true, osea si el campo esta vacio agregara la clase danger
  const cambiarClaseInput = (comprobar, inputComprobar) => {
    const inputCapitalize = inputComprobar.replace(/\b\w/g, (char) => char.toUpperCase())

    if (comprobar) {
      setClase('border-danger is-invalid') // aplica las clases bootstrap invalido
      setAdvertencia(`Debe ingresar el ${inputCapitalize}`)
    } else if (!comprobar) {
      setClase('border-success is-valid') // aplica las clases bootstrap valido
      setAdvertencia()
    } else {
      setClase() // si no se deja sin estilos
    }
  }
  // valida que el rut tenga 10 caracteres
  const cambiarClaseRut = (comprobar, rut) => {
    const rutContado = rut.length
    const patronRut = /^[0-9]{7,8}-[0-9kK]{1,2}$/
    const resultado = patronRut.test(rut)

    if (rutContado === 0 || rut === '-') {
      setClase('border-danger is-invalid')
      setAdvertencia('Debe ingresar un Rut')// Agrega la advertencia
    } else if (comprobar || rutContado <= 9 || !resultado) {
      setClase('border-danger is-invalid')
      setAdvertencia('Ingrese un Rut valido con 9 digitos')
    } else if (!comprobar && resultado) {
      setClase('border-success is-valid')
      setAdvertencia()
    } else {
      setClase()
      setAdvertencia()
    }
  }
  // valida el correo
  const cambiarClaseCorreo = (comprobar, correo) => {
    const patron = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    // Utiliza la función test para verificar si el correo coincide con el patrón true o false
    const resultado = patron.test(correo)
    const correoContado = correo.length
    if (correoContado === 0) {
      setClase('border-danger is-invalid')
      setAdvertencia('Debe ingresar un correo')
    } else if (comprobar || !resultado) {
      setClase('border-danger is-invalid')
      setAdvertencia('Introdusca una direccion de Correo valida')
    } else if (!comprobar && resultado) {
      setClase('border-success is-valid')
      setAdvertencia()
    } else {
      setClase()
      setAdvertencia()
    }
  }
  const cambiarClaseContraseña = (comprobar, contraseña) => {
    const patronContraseña = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{8,})/
    const contraseñaValida = patronContraseña.test(contraseña)
    const contraseñaContada = contraseña.length
    if (contraseñaContada === 0) {
      setClase('border-danger')
      setAdvertencia('Debe ingresar una Contraseña')
    } else if (comprobar || !contraseñaValida) {
      setClase('border-danger ')
      setAdvertencia('Ingrese almenos un caracter especial ej: @, mayuscula y numero')
    } else if (!comprobar && contraseñaValida) {
      setClase('border-success')
      setAdvertencia()
    } else {
      setClase()
      setAdvertencia()
    }
  }
  const cambiarClaseTelefono = (comprobar, telefono) => {
    const telefonoContado = telefono.length// cuenta la cantidad de digitos
    const patronTelefono = /^\+56\s\d{9}$/
    const telefonoValidado = patronTelefono.test(telefono)

    if (telefonoContado === 0 || telefono === '+56') {
      setClase('border-danger is-invalid')
      setAdvertencia('Debe ingresar un Telefono')// Agrega la advertencia
    } else if (comprobar || !telefonoValidado) {
      setClase('border-danger is-invalid')
      setAdvertencia('Ingrese un numero de telefono valido con 9 digitos')
    } else if (!comprobar && telefonoValidado) {
      setClase('border-success is-valid')
      setAdvertencia()
    } else {
      setClase()
      setAdvertencia()
    }
  }
  const limpiarClase = () => {
    setClase()
  }

  const datoInput = (comprobar, inputComprobar, valor) => {
    // llamar a la funcion que le corresponde
    if (inputComprobar === 'correo') {
      cambiarClaseCorreo(comprobar, valor)
    } else if (inputComprobar === 'rut') {
      cambiarClaseRut(comprobar, valor)
    } else if (inputComprobar === 'contraseña') {
      cambiarClaseContraseña(comprobar, valor)
    } else if (inputComprobar === 'telefono') {
      cambiarClaseTelefono(comprobar, valor)
    } else if (comprobar === 'limpiar') {
      limpiarClase()
    } else {
      cambiarClaseInput(comprobar, inputComprobar)
    }
  }

  return { advertencia, clase, datoInput }
}
