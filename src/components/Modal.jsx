/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Close from '../icons/close';

const Modal = ({ setModal, guardarGasto, gastoEditar, setGastoEditar }) => {
	const [nombre, setNombre] = useState('');
	const [cantidad, setCantidad] = useState(0);
	const [categoria, setCategoria] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [id, setId] = useState('');
	const [fecha, setFecha] = useState('');

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setNombre(gastoEditar.nombre);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
			setId(gastoEditar.id);
			setFecha(gastoEditar.fecha);
		}
	}, []);

	const cerrarModal = () => {
		setModal(false);
		setGastoEditar({});
	};

	const handleSubmit = e => {
		e.preventDefault();

		if ([nombre, cantidad, categoria].includes('')) {
			setMensaje('Fallo la validación');
			setTimeout(() => {
				setMensaje('');
			}, 3000);
			return;
		}
		setMensaje('');
		guardarGasto({ nombre, cantidad, categoria, id, fecha });
	};

	return (
		<div className='modal'>
			<form onSubmit={handleSubmit} className='modal-div'>
				<Close onClick={cerrarModal} className='close-icon' />
				<input
					type='text'
					placeholder='Nombre del Gasto'
					className='input-text'
					value={nombre}
					onChange={e => setNombre(e.target.value)}
				/>
				<input
					type='number'
					placeholder='Cantidad del Gasto'
					className='input-text'
					value={cantidad}
					onChange={e => setCantidad(Number(e.target.value))}
				/>
				<div className='campo-select'>
					<select
						value={categoria}
						onChange={e => setCategoria(e.target.value)}
						id='categoria'
					>
						<option value=''>-- Seleccione Categoria--</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='casa'>Casa</option>
						<option value='gastos'>Gastos Varios</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Saludo</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>

				<input
					type='submit'
					className='btn-add'
					value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir Nuevo Gasto'}
				/>
				<div className='alerta-error'>{mensaje}</div>
			</form>
		</div>
	);
};

export default Modal;
