/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
	presupuesto,
	gastos,
	setGastos,
	setPresupuesto,
	setIsValidPresupuesto
}) => {
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);
	const [porcentaje, setPorcentaje] = useState(0);

	const handleResetApp = () => {
		const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

		if (resultado) {
			setGastos([]);
			setPresupuesto(0);
			setIsValidPresupuesto(false);
		}
	};

	useEffect(() => {
		const totalGastado = gastos.reduce(
			(total, gasto) => gasto.cantidad + total,
			0
		);

		const totalDisponible = presupuesto - totalGastado;
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);
		}, 1500);

		setDisponible(totalDisponible);
		setGastado(totalGastado);
	}, [gastos]);

	const formatearCantidad = cantidad => {
		return cantidad.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	};

	return (
		<div className='box-presupuesto'>
			<div>
				<CircularProgressbar
					className='circular'
					styles={buildStyles({
						textColor: porcentaje > 100 ? '#960000' : 'black',
						pathColor: porcentaje > 100 ? '#960000' : 'black',
						trailColor: 'gold',
						textSize: '8px'
					})}
					value={porcentaje}
					text={`${porcentaje}% Gastados`}
				/>
			</div>
			<div>
				<button className='reset-app' onClick={handleResetApp}>
					Resetear App
				</button>
				<p className='p-presupuesto'>
					<span className='span-presupuesto'>Presupuesto: </span>{' '}
					{formatearCantidad(presupuesto)}
				</p>
				<p className={`${disponible < 0 ? 'negativo' : 'p-presupuesto'}`}>
					<span className='span-presupuesto'>Disponible: </span>{' '}
					{formatearCantidad(disponible)}
				</p>
				<p className='p-presupuesto'>
					<span className='span-presupuesto'>Gastado: </span>{' '}
					{formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;
