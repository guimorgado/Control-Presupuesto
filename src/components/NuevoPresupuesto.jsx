/* eslint-disable react/prop-types */
import { useState } from 'react';

const NuevoPresupuesto = ({
	presupuesto,
	setPresupuesto,
	setIsValidPresupuesto
}) => {
	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = e => {
		e.preventDefault();

		if (!presupuesto || presupuesto < 0) {
			setMensaje('No es un presupuesto válido');
			return;
		}

		setMensaje('');
		setIsValidPresupuesto(true);
	};

	return (
		<div>
			<form onSubmit={handlePresupuesto}>
				<div className='input-div'>
					<label className='label-input'>Definir Presupuesto</label>
					<input
						type='number'
						value={presupuesto}
						onChange={e => setPresupuesto(Number(e.target.value))}
						placeholder='Añade tu presupuesto'
					/>
					<input type='submit' value='Añadir' />
					<div className='alerta-error'>{mensaje}</div>
				</div>
			</form>
		</div>
	);
};

export default NuevoPresupuesto;
