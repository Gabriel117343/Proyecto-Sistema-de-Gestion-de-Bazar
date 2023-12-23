import { useState } from 'react'

// HOOK PERSONZALIDO REUTILIZABLE - Custom Hook
export const useFormatos = (initialValue = '') => {
  const [nuevoFormato, setNuevoFormato] = useState(initialValue)

  const cambiarFormatoRut = (rut) => {
    // Elimina cualquier guión y espacios en blanco existentes
    if (rut) {
      let inputValor = rut.replace(/[-\s]/g, '')
      // Divide el valor en dos partes: parte anterior y última letra/dígito
      const primero = inputValor.slice(0, -1)
      const segundo = inputValor.slice(-1)

      // Forma el valor final con guión
      inputValor = primero + '-' + segundo
      if (inputValor === '-') {
        setNuevoFormato(rut)
        return
      }

      setNuevoFormato(inputValor)
    } else {
      setNuevoFormato(rut)
    }
  }
  // Esta funcion agregara un espacio despues del primero numero
  const cambiarFormatoTelefono = (telefono) => {
    // para poder borrar el +56 en el input
    if (telefono === '+56') {
      setNuevoFormato('')
      return
    }
    // agregara el +56 seguido de un espacio por ej: +56 935389543 al ingresar 935389543 en input
    const nuevoTelefono = telefono.startsWith('+56 ') || telefono === '+56'
      ? telefono
      : '+56 ' + telefono

    // esto solo sirve para evitar que en el input se vea +56 + al ingresar un '+', como un autocompletado
    if (nuevoTelefono === '+56 +') {
      setNuevoFormato('+56 ')
      return
    }
    setNuevoFormato(nuevoTelefono)
  }
  // esto solo limpiara los Formatos aplicados para que el input quede vacio
  const limpiarFormato = () => {
    setNuevoFormato('')
  }
  const datoFormato = (inputComprobar, valor) => {
    if (inputComprobar === 'rut') {
      cambiarFormatoRut(valor)
    } else if (inputComprobar === 'telefono') {
      cambiarFormatoTelefono(valor)
    } else if (inputComprobar === 'limpiar') {
      limpiarFormato()
    }
  }

  // finalmente retornara el nuevo formato , y la funcion que recibira los datos
  return { nuevoFormato, datoFormato, limpiarFormato }
}
