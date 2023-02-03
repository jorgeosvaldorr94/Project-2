import React, { Fragment, useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    
    // Definir el State
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    
    // Funcion q define Presupuesto
    const definirPresupuesto = (e) => {
        guardarCantidad(parseInt(e.target.value, 10))
    };
    
    //Submit para definir el Presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();
        
        //validar
        if(cantidad < 1 || isNaN( cantidad ) ) {
            guardarError(true);
            return;
        }
 
        //si pasa la validacion
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    };

    return ( 
        <Fragment>
            <h2>Coloca tú Presupuesto</h2>

            {
                (error)
                ?
                <Error
                    mensaje="Presupuesto no válido"
                />
                :
                null
            }

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type='number'
                    className='u-full-width'
                    placeholder='Inserta Presupuesto'
                    onChange={definirPresupuesto}
                />
                <input
                    type='submit'
                    className='button-primary u-full-width'
                    value='Definir Presupuesto'
                />
            </form>
        </Fragment>
     );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;
