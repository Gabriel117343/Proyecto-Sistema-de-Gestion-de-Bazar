import { useContext, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { VentasContext } from '../../../context/VentasContext'


import React from 'react'

export const Grafico = () => {
  const { stateVenta: { ventas }, getVentasContext } = useContext(VentasContext)

  useEffect(() => {
    const cargar = () => {
      getVentasContext()
    }
    cargar()
  }, [])
  console.log(ventas)
  // Convertir el total a número y la fecha de venta a un objeto Date
  const data = ventas.map(venta => ({
    ...venta,
    total: Number(venta.total),
    fecha_venta: new Date(venta.fecha_venta)
  }))

  // Filtrar las ventas de este mes
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const ventasEsteMes = data.filter(venta => {
    return venta.fecha_venta.getMonth() === thisMonth && venta.fecha_venta.getFullYear() === thisYear;
  });
  
  
  // Calcular el ingreso total de este mes
  const ingresoTotal = ventasEsteMes.reduce((total, venta) => total + venta.total, 0);
  
  return (
    <div className="row">
      <div className="col-md-6">
        <BarChart
          width={600}
          height={300}
          data={ventasEsteMes} // Usa solo las ventas de este mes
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#008000" />
        </BarChart>

      </div>
      <div className="col-md-6 d-flex align-items-center">
        
        <div>
          <h2>Ingreso este mes</h2>
          <h1 className="text-success">$ {ingresoTotal}</h1>
        </div>
      </div>
      
      
    </div>
  )

}
