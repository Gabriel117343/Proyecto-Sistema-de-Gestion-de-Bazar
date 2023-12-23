import React from 'react'

export const Carro = () => {
  return (
    <section>

      <div className="row">
        <div className="col-md-4 ps-5 pt-3">
          <div className="row">
            <div className="col-md-12">
              <div className='d-flex justify-content-between'>
                <strong>Coca cola</strong>
                <strong>$1200</strong>

              </div>
                <div className='d-flex justify-content-left ps-4'>
                  <strong>1.00</strong>
                  <p>/Unidades en $1200</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className='d-flex justify-content-between'>
                  <strong>Atun</strong>
                  <strong>$900</strong>

                </div>
                <div className='d-flex justify-content-left ps-4'>
                  <strong>2.00</strong>
                  <p>/Unidades en $1800</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className='d-flex justify-content-between'>
                  <strong>Aceite</strong>
                  <strong>$1600</strong>

                </div>
                  <div className='d-flex justify-content-left ps-4'>
                  <strong>1.00</strong>
                  <p>/Unidades en $1600</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className='d-flex justify-content-between'>
                  <strong>Mostaza</strong>
                  <strong>$2000</strong>

                </div>
                <div className='d-flex justify-content-left ps-4'>
                  <strong>3.00</strong>
                  <p>/Unidades en $6000</p>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <div className='d-flex justify-content-around gap-2'>
                  <button className='btn btn-info form-control'><i className='bi bi-gift text-white'></i> Cupon</button>
                  <button className='btn btn-danger form-control'><i className='bi bi-trash'></i>Cancelar</button>
                </div>
              </div>
              <div className="col-md-12 border mt-4">
                <div className="d-flex align-items-center ps-2">
                  <i className='bi bi-person-circle icono-p'></i>
                  <p className='pt-2 ps-5'>Jorge Flores</p>
                  
                </div>
                  <div className=' d-flex align-items-center justify-content-between'>
                    <strong>Total: </strong>
                    <p>$5700</p>

                  </div>
                  <button className='btn btn-success form-control mb-3 mt-4'>Pago</button>
                  
                    
              
                
                
              </div>
          </div>
          
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-4 circle">
              <i className='bi bi-house-fill house'></i>
              Abarrotes
            </div>  
          </div>
          <div className="d-flex pl-5">
            <p>Categoria</p>
            <select className='form-select ms-2 mx-5'>
              <option value="">Lactos</option>
              <option value="s"></option>
            </select>
            <input type="text" className="form-control" placeholder='Ej: arroz miraflores'/>
            <button className='btn btn-primary ms-5 mx-5'>buscar</button>

          </div>
          <h1 className='text-center mt-5'>No se han encontrado Productos..</h1>
          
          <br />
        </div>
        
      </div>
    </section>
  )
}
