import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import salesReport from './salesData.json';

const SalesList = () => {
  const [salesData, setSalesData] = useState(salesReport);
  let salesTotal = 0;
  for (let sale of salesReport) {
    salesTotal += parseInt(sale.valor);
  }

  return (
    <div className="text-center">
      <Table striped bordered className="my-5 mx-auto w-50 caption-top">
        <caption>Lista de ventas</caption>
        <thead className='table-primary'>
          <tr>
            <th>Fecha</th>
            <th>ID Venta</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            salesData.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td>{sale.fecha}</td>
                  <td>{sale.id}</td>
                  <td>{`${sale.valor}$`}</td>
                </tr>
              );
            }
            )
          }
          <tr key='total'>
            <td colSpan={2} className="text-center font-weight-bold">Total</td>
            <td className="font-weight-bold">{`${salesTotal}$`}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
};

export default SalesList;