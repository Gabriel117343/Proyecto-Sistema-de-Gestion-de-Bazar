/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef, useId, useContext } from 'react'

import { toast } from 'react-hot-toast'
import './styles.css'
import { useClasesInput } from '../../../hooks/useClasesInput'

// debounce retrasara le ejecucion de validarTerminos para reducir la cantidad de veces que se ejecute
import debounce from 'lodash/debounce'
import { UsuariosContext } from '../../../context/UsuariosContext'

export const FormularioEdicion = ({ cerrarModal }) => {
  // Accediendo al valor :id de la ruta /editar/<id>, id del usuario a buscar


  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  

  const { stateUsuario: {usuarios, usuarioSeleccionado}, updateUsuario, getUsuarios } = useContext(UsuariosContext)
  // Creando un id para los inputs
  const idEditAdmin = useId()

  // navegacion

  // Referencias

  const nombreRef = useRef()
  const apellidoRef = useRef()
  const telefonoRef = useRef()
  const correoRef = useRef()

  const jornadaRef = useRef()
  const checkRef = useRef()

  // Llamada a Custom Hooks, hooks personalizado para asignar clases a los inputs

  const claseInput1 = useClasesInput()
  const claseInput2 = useClasesInput()
  const claseInput3 = useClasesInput()
  const claseInput4 = useClasesInput()

  // si el input esta vacio retornara un true
  const validarCampos = (validar) => {
    validar = validar.trim()
    console.log(!validar)
    return !validar
  }

  const validarCorreoRepetido = (correo) => {
    // busca si el correo ya fue registrado con algun usuario
    const correoValidado = usuarios.find(co => co.email === correo)
    return new Promise((resolve, reject) => { // Uso de promesas
      if (correoValidado) {
        // retorna el error
        reject(new Error(`Ya existe un usuario con el correo: ${correo}`))
    
      } else {
        resolve() // se podra continuar con actualizarUsuarios
      }
    })
  }

  const actualizarUsuario = async (event) => {
    event.preventDefault() // Previene el comportamiento por defecto de un formulario (recargar la página)

    const usuario = Object.fromEntries(new FormData(event.target)) // obtiene los datos del formulario y los convierte en un objeto
    console.log(usuario)
    const { rut, nombre, apellido, telefono, email, password, jornada, is_active } = usuario // desestructura el objeto usuario para obtener los datos del usuario
    // si el usuario no selecciona el checkbox is_active sera undefined
    console.log(usuario.is_active)
    // si el usuario no selecciona el checkbox is_active sera undefined
    if (usuario.is_active === undefined) {
      usuario.is_active = false
    } else {
      usuario.is_active = true
    }
    
    const use = usuarioSeleccionado // usuario buscar son los datos del usuario encontrado
    // Esto sirve para que mantenga el rut original si no se modifica
    // Evitara que de un error donde el rut sea igual al de otro usuario
    if (use.nombre === nombre && use.apellido === apellido && use.telefono === telefono && use.email === email  && use.is_active === is_active && use.jornada === jornada) {
      console.log('ambos iguales')
      toast.error('No hubo cambios!', { duration: 3000 })
      cerrarModal()
      
    }

    try {
      
      // si el correo seguira siendo el mismo no llamara a la funcion para validar el correo repetido
      if (email === use.email) {
        
      
        const { success, message } = await updateUsuario(usuarioSeleccionado.id, usuario)
        if (success) {
          toast.success(message, { duration: 3000 })
          getUsuarios()
          
          cerrarModal()
    
        } else {
          toast.error(message, { duration: 3000 })    
          cerrarModal()
        }
  
      } else {
        await validarCorreoRepetido(email) // valida si el correo ya fue registrado con algun usuario
        
      }

      if (email !== use.email) {
        const { success, message } = await updateUsuario(usuarioSeleccionado.id, usuario)
        if (success) {
          toast.success(message, { duration: 3000 })
          getUsuarios()
          cerrarModal()
        } else {
          toast.error(message, { duration: 3000 })
          cerrarModal()
        }
      }

    } catch (error) {
      setIsBtnDisabled(true) // Desactiva el boton del formulario
      cerrarModal()
      // Maneja cualquier error que pueda ocurrir durante la operación asincrónica
      // Muestra un mensaje de error si es necesario con el reject - new Error - de cada await
      toast.error('No se pudo Editar el usuario: ' + error.message, { duration: 4000 })
    }
  }

  const validarEstadoBoton = () => {
    setIsBtnDisabled(true)
    console.log('validando...')
    // Se quitan los espacios en blanco para que no sean tomandos en cuenta con trim()
    const nom = nombreRef.current.value.trim()
    const ape = apellidoRef.current.value.trim()
    const tel = telefonoRef.current.value.trim()
    const cor = correoRef.current.value.trim()
  
    // test devolvera un true si cumple con el patron requerido
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    const correoValido = patronCorreo.test(cor)

    const patronTelefono = /^\+56\s\d{9}$/
    const telefonoValido = patronTelefono.test(tel)

    // valida si hay algun campo que no cumpla con los requisitos
    const camposValidados = nom === '' || ape === '' || !telefonoValido || !correoValido
    console.log(camposValidados)
    if (camposValidados === true) {
      setIsBtnDisabled(true)
    } else {
      setIsBtnDisabled(false)
    };
  }
  // Aqui se manejan 2 onChange del Input
  const handleOnChange = async (inputComprobar, valor, claseInput) => {
    // 1 El parametro enviado se utilizara para llamar al Hook personalizado de clases
    await claseInput.datoInput(validarCampos(valor), inputComprobar, valor) // lo primer parametro llamara a una funcion con el valor el otro parametro solo el valor de correo
    // 2 Llama a la funcion que validara si el boton estara desactivado o no
    validarEstadoBoton()
    console.log(claseInput.advertencia)
  }
  // debounce hara un retraso de 500 milisegundos antes de ejecutar validaciones
  // Optimiza el rendimiento
  // eslint-disable-next-line camelcase
  const debounce_handleOnChange = debounce(handleOnChange, 500)


  return (
    
    <form
      onSubmit={actualizarUsuario} className='form formulario-datos' id={idEditAdmin}
    >
      <div className='form-group'>
        <label htmlFor={`${idEditAdmin}-rut`}>Rut</label>
        <input
          className='form-control' type='text'
          defaultValue={usuarioSeleccionado.rut} readOnly id={`${idEditAdmin}-rut`} name='rut'
        />
      </div>
      <div className='form-group'>
        <label htmlFor={`${idEditAdmin}-nombre`}>Nombre</label>
        <input
          ref={nombreRef} onChange={e => debounce_handleOnChange('nombre', e.target.value, claseInput1)} type='text' className={`form-control text-capitalize ${claseInput1.clase}`}
          placeholder='Nombres' defaultValue={usuarioSeleccionado.nombre} id={`${idEditAdmin}-nombre`} name='nombre'
        />
        <div className='advertencia'>
          <p className='d-block text-danger m-0'>{claseInput1.advertencia}</p>
        </div>

      </div>
      <div className='form-group'>

        <label htmlFor={`${idEditAdmin}-apellido`}>Apellido</label>
        <input
          ref={apellidoRef} onChange={e => debounce_handleOnChange('apellido', e.target.value, claseInput2)} type='text' className={`form-control text-capitalize ${claseInput2.clase}`}
          placeholder='Apellidos' defaultValue={usuarioSeleccionado.apellido} id={`${idEditAdmin}-apellido`} name='apellido'
        />
        <div className='advertencia'>
          <p className='d-block text-danger m-0'>{claseInput2.advertencia}</p>
        </div>

      </div>
      <div className='form-group'>
        <label htmlFor={`${idEditAdmin}-telefono`}>Telefono</label>
        <input
          ref={telefonoRef} onChange={e => debounce_handleOnChange('telefono', e.target.value, claseInput3)} type='tel' className={`form-control text-capitalize ${claseInput3.clase}`}
          placeholder='Ej: 9 23432303' defaultValue={usuarioSeleccionado.telefono} id={`${idEditAdmin}-telefono`} maxLength={13} name='telefono'
        />
        <div className='advertencia'>
          <p className='d-block text-danger m-0'>{claseInput3.advertencia}</p>
        </div>

      </div>

      <div className='form-group'>
        <label htmlFor={`${idEditAdmin}-correo`}>Correo</label>
        <input
          ref={correoRef} onChange={e => debounce_handleOnChange('correo', e.target.value, claseInput4)} type='email' className={`form-control ${claseInput4.clase}`}
          placeholder='Ej: corr.nuevo09@gmail.com' defaultValue={usuarioSeleccionado.email} id={`${idEditAdmin}-correo`} name='email'
        />

        <div className='advertencia'>
          <p className='d-block text-danger m-0'>{claseInput4.advertencia}</p>
        </div>
      </div>
 
      <div className='form-group'>
        <label htmlFor={`${idEditAdmin}-jornada`}>Jornada</label>
        <select onChange={validarEstadoBoton} ref={jornadaRef} className='form-control' name='jornada' id={`${idEditAdmin}-jornada`} defaultValue={usuarioSeleccionado.jornada}>
          <option value={usuarioSeleccionado.jornada}>{usuarioSeleccionado.jornada}</option>
          {usuarioSeleccionado.jornada !== 'duirno' && <option value='duirno'>Diurno</option>}
          {usuarioSeleccionado.jornada !== 'mixto' && <option value='mixto'>Mixto</option>}
          {usuarioSeleccionado.jornada !== 'vespertino' && <option value='vespertino'>Vespertino</option>}
        </select>
      </div>
      <div className='d-flex mb-3 mt-3'>
        <input className='form-check-input' onClick={validarEstadoBoton} defaultChecked={usuarioSeleccionado.is_active} ref={checkRef} type='checkbox' id={`${idEditAdmin}-estado`} name='is_active' />
        <p className='ps-2 m-0'>Usuario Activo</p>
      </div>
      <div className='mt-3 d-flex justify-content-between'>
        <button type='submit' className='btn btn-success' disabled={isBtnDisabled}>Actualizar</button>
        <button className='btn btn-danger' type='button' onClick={cerrarModal}>Cancelar</button>
      </div>

    </form>

          
  )
}
