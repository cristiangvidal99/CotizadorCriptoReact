import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    font-size: 15px;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
`;
// Creando primer hook
const useCriptomoneda = (label, stateInicial, opciones) => {

   
    // State de nuestro Custom Hook
    const [state, actualizarState] = useState(stateInicial);
    

    const SelectCripto = () => (
       <Fragment>
           <Label>{label}</Label>
           <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
           >
               <option value=''>Seleccione</option>
               {opciones.map(opcion => (
                   <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
               ))}
           </Select>
       </Fragment>
    );

    // Retorna el state, interfaz y funcion que lo modifica

    return [state, SelectCripto, actualizarState];
}

export default useCriptomoneda;