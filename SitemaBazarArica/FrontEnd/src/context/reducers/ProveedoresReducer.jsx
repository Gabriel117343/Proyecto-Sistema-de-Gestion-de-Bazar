import React from 'react'

export const ProveedoresReducer = (stateProveedor, action) => {

  const { type, payload } = action // destructuring de la accion
  
  switch (type) {
    case 'GET_PROVEEDORES':
      return {
        ...stateProveedor,
        proveedores: payload // guarda los proveedores en el estado
      }
    case 'GET_PROVEEDOR':
      return {
        ...stateProveedor,
        proveedorSeleccionado: payload // guarda el proveedor seleccionado en el estado
      }
    case 'CREATE_PROVEEDOR':
      return {
        ...stateProveedor,
        proveedores: [...stateProveedor.proveedores, payload] // agrega el nuevo proveedor al arreglo de proveedores
      }
    case 'DELETE_PROVEEDOR':
      return {
        ...stateProveedor,
        proveedores: stateProveedor.proveedores.filter((proveedor) => proveedor.id !== payload) // filtra los proveedores que no sean el que se quiere eliminar
      }
    case 'UPDATE_PROVEEDOR':
      return {
        ...stateProveedor, // copia el estado actual del componente
        proveedores: stateProveedor.proveedores.map((proveedor) => proveedor.id === payload.id ? payload : proveedor) // actualiza el proveedor  que se modifico y deja los demas igual como estaban antes de la modificacion
      }
    default:
      return stateProveedor // retorna el estado actual del componente si no se ejecuta ninguna accion
  }
}
