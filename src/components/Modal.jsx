import { useState, useEffect } from "react"
import CerrarBtn from "../img/cerrar.svg"
import Mensaje from "./Mensaje";

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar, editarGasto }) => {

    const [mensaje, setMensaje] = useState('');
    const [editar, setEditar] = useState(false);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setEditar(true);
          }
    }, []);

    const ocultarModal = () => {

        setAnimarModal(false);
        setGastoEditar({});

        setTimeout(() => {
            setModal(false);
            setEditar(false);
        }, 500);
    }

    const handleGastoSubmit = e => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('');
            }, 1000);

            return;
        }

        if(editar) {
            editarGasto({id: gastoEditar.id, nombre, cantidad, categoria});
        } else {
            guardarGasto({nombre, cantidad, categoria});   
        }

        setNombre('');
        setCantidad('');
        setCategoria('');

        ocultarModal();
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="Cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleGastoSubmit}
            >
                <legend>{editar ? 'Editando gasto' : 'Añadiendo gasto'}</legend>

                {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}>
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={editar ? "Guardar cambios" : "Añadir gasto"}
                />
            </form>
        </div>
    )
}

export default Modal