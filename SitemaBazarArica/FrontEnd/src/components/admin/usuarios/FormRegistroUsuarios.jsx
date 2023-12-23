import React, { useState, useRef, useId, useContext } from 'react'


import { useClasesInput } from '../../../hooks/useClasesInput'// cutom hook para las clases - hook personalizado
import { useFormatos } from '../../../hooks/useFormatos'// custom hook para los formatos - hook personalizado
import './styles.css'// estilos del formulario
import { toast } from 'react-hot-toast' // alertas para la interfaz
import debounce from 'lodash/debounce' // para optimizar el rendimiento
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // icono eye para usar en input contraseña
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import confetti from 'canvas-confetti' // efecto de confetti
import { UsuariosContext } from '../../../context/UsuariosContext' // contexto para todo el arbol de componentes de Administrador

export const FormRegistroUsuarios = ({ cerrarModal }) => {
  // cambiar el boton en true o false con isBtnDisabled
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
 

  const { stateUsuario: { usuarios }, createUsuario } = useContext(UsuariosContext) // state tiene el estado del contexto, en este caso el estado de la lista de usuarios
  // id para los inputs
  const idFormAdmin = useId()
  // clases que referencias al Hook useClasesInput
  const claseRut = useClasesInput()
  const claseNombre = useClasesInput()
  const claseApellido = useClasesInput()
  const claseTelefono = useClasesInput()
  const claseCorreo = useClasesInput()
  const claseContraseña = useClasesInput()
  // Formatos que seran aplicados atravez del hook useFormatos
  const rut = useFormatos()
  const telefono = useFormatos()

  // referencias
  const rutRef = useRef()
  const nombreRef = useRef()
  const apellidoRef = useRef()
  const telefonoRef = useRef()
  const correoRef = useRef()
  const contraseñaRef = useRef()
  const jornadaRef = useRef()

  const checkRef = useRef()

  /// /si el input esta vacio retornara un true
  const validarCampos = (validar) => {
    validar = validar.trim()// trim eliminara los espacios en blanco

    return !validar
  }

  const limpiarCampos = () => {
    rutRef.current.value = ''
    nombreRef.current.value = ''
    apellidoRef.current.value = ''
    telefonoRef.current.value = ''
    correoRef.current.value = ''
    contraseñaRef.current.value = ''

    checkRef.current.checked = false
    // limpiara las clases
    claseRut.datoInput('limpiar')
    claseNombre.datoInput('limpiar')
    claseApellido.datoInput('limpiar')
    claseTelefono.datoInput('limpiar')
    claseCorreo.datoInput('limpiar')
    claseContraseña.datoInput('limpiar')
    rut.datoFormato('limpiar')
    telefono.datoFormato('limpiar')
    validarEstadoBoton()
  }
  const validarRut = (rut) => {
    // Retorna el resultado de la promesa resolve o reject
    return new Promise((resolve, reject) => {
      const rutValidado = usuarios.find(pe => pe.rut === rut)

      if (rutValidado) {
        // llama a los Hooks personalizados para limpiar todos los campos
        limpiarCampos()
        // retorna el error
        reject(new Error(`Ya existe un usuario con el rut: ${rut}`))
      } else {
        resolve()
      };
    })
  }

  const validarCorreoRepetido = (correo) => {
    // busca si el correo ya fue registrado con algun usuario
    const correoValidado = usuarios.find(co => co.email === correo)
    return new Promise((resolve, reject) => {
      if (correoValidado) {
        limpiarCampos()
        // retorna el error
        reject(new Error(`Ya existe un usuario con el correo: ${correo}`))
      } else {
        resolve()
      }
    })
  }
  const quitarCaracteresEspeciales = (usuario) => {
    // Reemplaza caracteres especiales por un solo espacio en blanco
    const nombreSinCaracter = usuario.nombre.replace(/[^a-zA-Z ]+/g, ' ')
    const apellidoSinCaracter = usuario.apellido.replace(/[^a-zA-Z ]+/g, ' ')
    const usuarioSinCaracteres = { ...usuario, nombre: nombreSinCaracter, apellido: apellidoSinCaracter }
    return usuarioSinCaracteres
  }
  const registrarPersona = async (event) => {
    event.preventDefault()
    toast.loading('Registrando...', { duration: 2000 })
    setIsBtnDisabled(true) // Desactiva el boton del formulario
    const form = Object.fromEntries(new FormData(event.target))// crea un objeto con los datos del formulario, -- esto es javascript puro --
    // filtrar la imagen para que no se envie al servidor
    const usuario = quitarCaracteresEspeciales(form) // quita los caracteres especiales del nombre y apellido
    // const { rut, nombre, apellido, telefono, correo, contraseña, jornada } = persona// destructuring para obtener los valores del objeto persona
    try {
      // Realizar la operación asincrónica, por ejemplo, crear un usuario
      await validarRut(usuario.rut)
      await validarCorreoRepetido(usuario.email)
      setTimeout(async () => {
        const { success, message } = await createUsuario(usuario)
        console.log(success)
        if (success) {
          cerrarModal()
          toast.success(message, { duration: 3000 })
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
       
        } else {
          cerrarModal()
          toast.error(message, { duration: 4000 })
        }

        limpiarCampos()
        
      }, 2000)
    } catch (error) {
      setTimeout(() => {
        setIsBtnDisabled(true) // Desactiva el boton del formulario
        // Maneja cualquier error que pueda ocurrir durante la operación asincrónica
        // Muestra un mensaje de error si es necesario con el reject - new Error
        toast.error('No se pudo crear el usuario: ' + error.message, { duration: 4000 })
        cerrarModal()
      }, 2000)
    }
    /*
        const rutvalidado = validarRut(rut)
        if (rutvalidado) {
            setPersonas([...personas, persona])
            confetti
            limpiarCampos()
            limpiarClases()
            console.log(personas)
        }
        */
  }

  const validarEstadoBoton = () => {
    // Se quitan los espacios en blanco para que no sean tomandos en cuenta con trim()
    const rut = rutRef.current.value.trim()
    const nom = nombreRef.current.value.trim()
    const ape = apellidoRef.current.value.trim()
    const tel = telefonoRef.current.value.trim()
    const cor = correoRef.current.value.trim()
    const con = contraseñaRef.current.value.trim()
    // test devolvera un true si cumple con el patron requerido

    const patronRut = /^[0-9]{8,9}-[0-9kK]{1}$/
    const rutValido = patronRut.test(rut)

    const patronCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    const correoValido = patronCorreo.test(cor)

    const patronContraseña = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?=.{8,})/
    const contraseñaValida = patronContraseña.test(con)

    const patronTelefono = /^\+56\s\d{9}$/
    const telefonoValido = patronTelefono.test(tel)
    // Si el check esta en true o false
    const check = checkRef.current.checked

    // valida si hay algun campo que no cumpla con los requisitos
    const camposValidados = check === false || !rutValido || nom === '' || ape === '' || !telefonoValido || !correoValido || !contraseñaValida
    if (camposValidados === true) {
      setIsBtnDisabled(true)// el boton se desactivara
    } else {
      setIsBtnDisabled(false)// el boton se activara
    };
  }
  const formatoInput = async (inputComprobar, valor, claseInput, inputFormato) => {
    // 1 El parametro enviado se utilizara para llamar al Hook personalizado de formatos
    await inputFormato.datoFormato(inputComprobar, valor)
    // 2 El parametro enviado se utilizara para llamar al Hook personalizado de clases
    debounce_handleOnChange(valor, claseInput, inputComprobar)
  }
  const handleOnChange = async (valor, claseInput, inputComprobar) => {
    console.log('validando...')
    // 1 El parametro enviado se utilizara para llamar al Hook personalizado de clases
    await claseInput.datoInput(validarCampos(valor), inputComprobar, valor) // validarCampos retornara un true si el input esta vacio

    validarEstadoBoton()
  }
  // debounce hara que la funcion handleOnChange se ejecute 500 milisegundos despues de que se deje de pulsar las teclas
  // Optimiza el rendimiento
  // eslint-disable-next-line camelcase
  const debounce_handleOnChange = debounce(handleOnChange, 300)

  // Activa o desactivar la visualizacion de la contraseña atravez del estado anterior
  const estadoContraseña = () => {
    setMostrarContraseña(prevState => !prevState)
  }
  return (
          <form 
              onSubmit={registrarPersona} className='form formulario-datos mt-4 col-md-12' id={idFormAdmin}
            >

  
            
            <div className='form-group'>
              <label htmlFor={`${idFormAdmin}-rut`}>Rut</label>
              <input
                onChange={e => formatoInput('rut', e.target.value, claseRut, rut)} ref={rutRef} className={`form-control text-capitalize ${claseRut.clase}`} type='text' maxLength={10}
                placeholder='Ej:12345678-9' value={rut.nuevoFormato} id={`${idFormAdmin}-rut`} name='rut'
              />

              <div className='advertencia'>
                <p className='d-block text-danger m-0'>{claseRut.advertencia}</p>
              </div>

            </div>

            <div className='form-group'>
              <label htmlFor={`${idFormAdmin}-nombre`}>Nombre</label>
              <input
                ref={nombreRef} onChange={e => debounce_handleOnChange(e.target.value, claseNombre, 'nombre')} type='text' className={`form-control text-capitalize ${claseNombre.clase}`}
                placeholder='Ingrese Nombres' id={`${idFormAdmin}-nombre`} name='nombre'
              />
              <div className='advertencia'>
                <p className='d-block text-danger m-0'>{claseNombre.advertencia}</p>
              </div>

            </div>
            <div className='form-group'>

              <label htmlFor={`${idFormAdmin}-apellido`}>Apellido</label>
              <input
                onChange={e => debounce_handleOnChange(e.target.value, claseApellido, 'apellido')} ref={apellidoRef} type='text' className={`form-control text-capitalize ${claseApellido.clase}`}
                placeholder='Ingrese Apellidos' id={`${idFormAdmin}-apellido`} name='apellido'
              />
              <div className='advertencia'>
                <p className='d-block text-danger m-0'>{claseApellido.advertencia}</p>
              </div>

          
            <div className='form-group'>
              <label htmlFor={`${idFormAdmin}-telefono`}>Telefono</label>
              <input
                onChange={e => formatoInput('telefono', e.target.value, claseTelefono, telefono)} ref={telefonoRef} type='tel' className={`form-control text-capitalize ${claseTelefono.clase}`}
                placeholder='Ej: +56 92389543' value={telefono.nuevoFormato} maxLength={13} id={`${idFormAdmin}-telefono`} name='telefono'
              />
              <div className='advertencia'>
                <p className='d-block text-danger m-0'>{claseTelefono.advertencia}</p>
              </div>
              
              
            </div>

            </div>
            
              <div className='form-group'>
              <label htmlFor={`${idFormAdmin}-correo`}>Correo</label>
              <input
                onChange={e => debounce_handleOnChange(e.target.value, claseCorreo, 'correo')} ref={correoRef} type='email' className={`form-control ${claseCorreo.clase}`}
                placeholder='Ej: corr.nuevo09@gmail.com' id={`${idFormAdmin}-correo`} name='email'
              />
              <div className='advertencia'>
                <p className='d-block text-danger m-0'>{claseCorreo.advertencia}</p>
              </div>
            </div>
            <div className='form-group contraseña-container'>
              <label htmlFor={`${idFormAdmin}-contraseña`}>Contraseña</label>
              <input
                onChange={e => debounce_handleOnChange(e.target.value, claseContraseña, 'contraseña')} ref={contraseñaRef} type={mostrarContraseña ? 'text' : 'password'} className={`form-control ${claseContraseña.clase}`}
                placeholder='Min. 8 caracteres' id={`${idFormAdmin}-contraseña`} name='password'
              />
              <span className='icon'>
                <FontAwesomeIcon
                  icon={mostrarContraseña ? faEyeSlash : faEye}
                  onClick={estadoContraseña}
                />
              </span>

              <div className='advertencia'>
                <p className='d-block text-danger m-0'>{claseContraseña.advertencia}</p>
              </div>
            </div>
            
            <div className='form-group'>
              <label htmlFor={`${idFormAdmin}-jornada`}>Jornada</label>
              <select ref={jornadaRef} className='form-control' name='jornada' id={`${idFormAdmin}-jornada`}>

                <option value='duirno'>Duirno</option>
                <option value='vespertino'>Vespertino</option>
                <option value="mixto">Mixto</option>
              </select>
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='rol'>Rol</label>
              <select className='form-control' name='rol' id='rol'>
                <option value='administrador'>Administrador</option>
                <option value='vendedor'>Vendedor</option>
              </select>
            </div>
            <div className='d-flex mb-3 mt-3'>

                <input className='form-check-input' onChange={validarEstadoBoton} ref={checkRef} type='checkbox' />
                <p className='ps-2 m-0'>Autorizo la creacion del usuario</p>
              </div>
            <div className='d-flex mt-4 justify-content-between'>
                <button type='submit' className='btn btn-success estilo-boton animacion-boton' disabled={isBtnDisabled}>Registrar</button>
                <button type='button' className='btn btn-danger ms-3 estilo-boton animacion-boton' onClick={cerrarModal}>Cancelar</button>
            </div>
          
 
        </form>
  )
}