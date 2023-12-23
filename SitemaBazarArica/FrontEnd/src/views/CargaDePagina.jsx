import './views.css'
export const CargaDePagina = () => {
  return (
    <section style={{height:'100vh', paddingTop:'10rem'}} className="fondo-carga">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center row">
            <div style={{width: '10rem', height:'10rem'}} className="spinner-border text-primary" role="status">
              
            </div>
            <h2 className="text-center text-primary pt-3">Cargando...</h2>
          </div>
        </div>
      </div>
    </section>
  )
}