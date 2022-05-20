import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDiponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (porcentaje <= 50) {
            setColor('#1E8449');
        } else if (porcentaje > 50 && porcentaje <= 75) {
            setColor('#B7950B');
        } else if (porcentaje > 75) {
            setColor('#922B21');
        }
    }, [porcentaje])

    useEffect(() => {

        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado 
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto * 100)).toFixed(2);

        

        setDiponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
    }, [gastos])

    // Convierte a estilo moneda sin cambiar el formato de nuestra cantidad
    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar el presupuesto y gastos?');

        if( resultado ) {
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: `${color}`
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}>
                    Resetear App
                </button>
                <p><span>Presupuesto: </span>{formatearCantidad(presupuesto)}</p>
            </div>

            <div className="contenido-presupuesto">
                <p><span>Disponible: </span>{formatearCantidad(disponible)}</p>
            </div>

            <div className="contenido-presupuesto">
                <p><span>Gastado: </span>{formatearCantidad(gastado)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto