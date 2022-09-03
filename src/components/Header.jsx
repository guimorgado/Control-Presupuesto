/* eslint-disable react/prop-types */
import ControlPresupuesto from './ControlPresupuesto';
import NuevoPresupuesto from './NuevoPresupuesto';

const Header = ({
	setGastos,
	presupuesto,
	setPresupuesto,
	isValidPresupuesto,
	setIsValidPresupuesto,
	gastos
}) => {
	return (
		<header>
			<h1 className='h1-planificador'>Planificador de Gastos</h1>

			{isValidPresupuesto ? (
				<ControlPresupuesto
					setGastos={setGastos}
					setPresupuesto={setPresupuesto}
					setIsValidPresupuesto={setIsValidPresupuesto}
					gastos={gastos}
					presupuesto={presupuesto}
				/>
			) : (
				<NuevoPresupuesto
					presupuesto={presupuesto}
					setPresupuesto={setPresupuesto}
					setIsValidPresupuesto={setIsValidPresupuesto}
				/>
			)}
		</header>
	);
};

export default Header;
