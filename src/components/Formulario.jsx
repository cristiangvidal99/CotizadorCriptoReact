import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;
const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    // state del listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const Monedas = [
        {codigo: 'USD', nombre: 'Dolar de USA'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]
    // Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', Monedas);

    // Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)

    // Ejecutar llamado a la API con axios
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // Cuando el Usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        // Pasar los datos al componente principal
        guardarError(false);
        guardarCriptomoneda(criptomoneda);
        guardarMoneda(moneda);
    }
    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            
            <SelectMonedas></SelectMonedas>
            <SelectCripto></SelectCripto>
            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
    );
}

export default Formulario;