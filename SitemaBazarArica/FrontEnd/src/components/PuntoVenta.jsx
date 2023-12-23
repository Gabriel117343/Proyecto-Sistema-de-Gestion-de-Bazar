import React from 'react'
export const PuntoVenta = () => {
  return (
    <section>
      <div className="row">
        <div className="col-md-1">
          <div className=" bg-dark text-white pt-4 apartado-opciones">
            <ul className='d-flex row gap-4'>
              <li>
                <div className="cuadro1-min">
                  <i className='bi bi-shop'></i>
                </div>
              </li>
              <li>
                <div className="cuadro2-min">
                  <i className='bi bi-box-seam'></i>
                </div>              
              </li>
              <li>
                <div className="cuadro3-min">
                  <i className='bi bi-people'></i>
                </div>
              </li>
              <li>
                <div className="cuadro4-min">
                  <i className='bi bi-gear'></i>
                </div>

              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-11 mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="contenedor-opcion p-3 rounded ">
                <div className="d-flex justify-content-between">
                  <strong>Carro</strong>
                  <i className="bi bi-three-dots-vertical"></i>

                </div>
                
                <div className='row'>
                  
                  <div className="col-md-5 mt-5">
                    <button className='btn btn-primary mt-5'>Reanudar</button>
                    <button className='btn btn-danger mt-5 ms-2'>Cerrar</button>

                  </div>
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-6">
                        <p>Cliente</p>
                        <p>Subtotal</p>
                        <p>Descuento</p>
                        <p>Total</p>
                      </div>
                      <div className="col-md-6">
                        <p>Pepe</p>	
                        <p>$0.00</p>
                        <p>$0.00</p>
                        <p>$0.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
            <div className="contenedor-opcion p-3 rounded ">
                <div className="d-flex justify-content-between">
                  <strong>Ventas</strong>
                  <i className="bi bi-three-dots-vertical"></i>

                </div>
                
                <div className='row'>
                  
                  <div className="col-md-5 mt-5">
                    <button className='btn btn-success mt-5'>Nueva venta</button>

                  </div>
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-6">
                        <p>Fecha ultima venta: </p>
                        <p>Hora ultima venta: </p>
                        <p>Ultimo vendedor: </p>
                      
                      </div>
                      <div className="col-md-6">
                        <p>12/11/2023</p>
                        <br />
                        <p> 14:50 pm</p>
                        <p>Juan p.</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="punto-venta">
        <div className="col-md-4">
          <p>sdf</p>
        </div>
        <div className="col-md-8">
          <p>ff</p>
        </div>

      </div>

    </section>
  )
}
