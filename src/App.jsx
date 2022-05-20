/*
  Cuando son exportaciones por default al importarlos no es necesario colocarles {}
  En cambio si son simples exportaciones es necesario colorcarles {}
*/

import { useEffect, useState } from 'react'
import Header from './components/Header'
import Filtos from './components/Filtos';
import ListadoGasto from './components/ListadoGasto';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuseto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(filtro && filtro !== "") {
      const gastosFiltrados = gastos.filter(gastoFiltrado => gastoFiltrado.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem(presupuesto)) ?? 0 

    if( presupuestoLS > 0 ) {
      setIsValidPresupuesto(true);
    }
  }, [])

  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 1000);
    }
  }, [gastoEditar])

  const handleNuevoGasto = e => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 1000);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);
  }

  const editarGasto = gasto => {
    gasto.fecha = Date.now();

    const gastosEditados = gastos.map(gastoEditado =>
      gastoEditado.id === gasto.id ? gasto : gastoEditado);
    setGastos(gastosEditados);
  }

  const eliminarGasto = id => {

    const gastosActualizados = gastos.filter(gastoActualizado => gastoActualizado.id !== id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? "fijar" : ''}>
      <Header
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtos 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGasto
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
        />
      )}

    </div>
  )
}

export default App
