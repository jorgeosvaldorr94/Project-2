import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto, deuda}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState('');
    const [error, guardarError] = useState(false);
  

    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if( cantidad <= 0 || isNaN(cantidad) || nombre === '' ) {
            guardarError(true);
            return;
        }
        guardarError(false);

        //construir el gasto
        const gasto = {
            nombre, //Puede ser: => nombre: nombre,
            cantidad, //Puede ser: => cantidad: cantidad,
            id: shortid.generate()
        };

        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad('');
    };

    return ( 
        <form
            onSubmit={agregarGasto }
        >
            <h2>Agrega tus gastos aquí</h2>

            {
            (error)
            ?
            (
                <Error
                    mensaje='Revisa todos los campos'
                />
            )
            : 
            null
            }
            {
            (deuda)
            ?
            (
                <Error
                    mensaje='Tienes Deuda'
                />
            )
            : 
            null
            }


            <div>
                <label>Nombre del gasto</label>
                <input
                    type='text'
                    className='u-full-width'
                    placeholder='Ej. Electricidad'
                    value={nombre}
                    onChange={ (e) => {
                        guardarNombre(e.target.value)
                    }}
                ></input>
            </div>

            <div>
                <label>valor del gasto</label>
                <input
                    type='number'
                    className='u-full-width'
                    placeholder='Ej. 300'
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                ></input>
            </div>
            <input
                type='submit'
                className='button-primary u-full-width'
                value='Agregar Gasto'
            ></input>
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;
