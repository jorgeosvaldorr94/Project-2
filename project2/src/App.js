import React, { Fragment, useState, useEffect } from 'react';
import Pregunta from './components/Preguntas';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  //State para el Presupuesto
  const [presupuesto, guardarPresupuesto] = useState(0);

  //State para el Restante
  const [restante, guardarRestante] = useState(0);

  //State para saber que componente mostrar
  const [mostrarPregunta, actualizarPregunta] = useState(true);

  const [gasto, guardarGasto] = useState({});
  const [crearGasto, guardarCrearGasto] = useState(false);
  
  //gastos
  const [gastos, guardarGastos] = useState([]);
  
  //UseEfect que actualiza el restante
  useEffect(() => {
      if(crearGasto){
          guardarGastos([
            ...gastos,
            gasto
          ]);

          const presupuestoRestante = restante - gasto.cantidad;
          guardarRestante(presupuestoRestante);

          guardarCrearGasto(false)

        }
      },[gasto, gastos, crearGasto, restante]);

  //State para la deuda
  const [deuda, actualizarDeuda] = useState(false);

      
  useEffect( () => {
      if ( restante < 0 ) {
          console.log(restante);
          actualizarDeuda(true);
        }
      }, [restante, deuda]);


  return (
    <Fragment>
      <div className='container'>
        <header>
          <h1 className='h1Copy'>Presupuesto  y Gastos</h1>

          <div className='contenido-principal contenido'>
            {
            mostrarPregunta
            ?
                (
                <Pregunta
                    guardarPresupuesto = {guardarPresupuesto}
                    guardarRestante = {guardarRestante} 
                    actualizarPregunta={actualizarPregunta}
                />
                )
            :
                (
                <div className='row'>
                    <div className='one-half column'>
                        <Formulario
                           guardarGasto={guardarGasto}
                           guardarCrearGasto={guardarCrearGasto}
                           deuda={deuda}
                        />
                    </div>
                    <div className='one-half column'>
                         <Listado
                             gastos={gastos}
                         />
                         <ControlPresupuesto
                             presupuesto={presupuesto}
                             restante={restante}
                         />
                    </div>
                </div>
                )
            }
          </div>
        </header>
      </div>
    </Fragment>
  );
}

export default App;

