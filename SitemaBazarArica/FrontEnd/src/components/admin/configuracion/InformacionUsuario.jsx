
import './configuracion.css'
export const InformacionUsuario = ({usuario, usuarioImagen}) => {
  
 console.log(usuarioImagen)
  return (
    <article className='row ps-5'>
      <div>
        

        {usuarioImagen ?
        (
          <img className='imagen-perfil' src={usuarioImagen} alt="Imagen del usuario" />

        )
        :
        (
          <img className='imagen-perfil' src='https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png' alt='Imagen del usuario'/>
        )
        }
     
        <div className="pt-3">
          <h2 className='text-capitalize'>{usuario?.nombre} {usuario?.apellido}</h2>
          <div className="d-flex gap-2 pt-3">
            <strong>Rol:</strong>
            {usuario?.rol  ? 
            (
              <p className='text-capitalize'>{usuario.rol}</p>
            )
            :
            (
              <p className='badge bg-danger'>Inactivo</p>
            )}
          </div>
          <div className="d-flex gap-2 align-items-center">
            <strong>Estado:</strong>
            {usuario?.is_active === true ? <p className='badge bg-success m-0'>Activo</p> : <p className='badge bg-danger m-0'>Inactivo</p>}
            

          </div>
          <div className="d-flex align-items-center gap-2 mt-3 mb-3">
            <strong>Correo:</strong>
            <p className='m-0'>{usuario?.email ? usuario.email : 'Sin Correo'}</p>
          </div>
          <div className="d-flex gap-2">
            <strong>Jornada:</strong>
            {usuario?.jornada === 'mixto' && (<p>Mixto <i className='bi bi-sun-fill text-warning'></i><i className='bi bi-moon text-info'></i></p>)}
            {usuario?.jornada === 'duirno' && (<p>Nocturna <i className='bi bi-moon-fill text-info'></i></p>)}
            {usuario?.jornada === 'vespertino' && (<p>Diurna <i className='bi bi-sun-fill text-warning'></i></p>)}

          </div>
        </div>
          
      </div>
      
      
      
    </article>
  )
}
