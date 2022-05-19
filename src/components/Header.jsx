import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ 
    presupuesto, 
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    gastos, 
}) => {

  return (
    <header>
        <h1>Planificador de gastos</h1>

        {!isValidPresupuesto ? (
            <NuevoPresupuesto 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        ) : (
            <ControlPresupuesto 
                gastos={gastos}
                presupuesto={presupuesto}
            />
        )}
    </header>
  )
}

export default Header