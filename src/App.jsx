import { useEffect, useState } from 'react';
import Filtros from './components/Filtros';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import Plus from './icons/plus';

const App = () => {
	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto') ?? 0)
	);
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
	const [modal, setModal] = useState(false);
	const [gastos, setGastos] = useState([
		...(JSON.parse(localStorage.getItem('gastos')) ?? [])
	]);
	const [gastoEditar, setGastoEditar] = useState({});

	const [filtro, setFiltro] = useState('');
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);
		}
	}, [gastoEditar]);

	const handleNuevoGasto = () => {
		setModal(true);
		setGastoEditar({});
	};

	useEffect(() => {
		if (filtro) {
			const gastosFiltrado = gastos.filter(gasto => gasto.categoria === filtro);
			setGastosFiltrados(gastosFiltrado);
		}
	}, [filtro]);

	const eliminarGasto = id => {
		const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
		setGastos(gastosActualizados);
	};

	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto ?? 0);
	}, [presupuesto]);

	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
	}, [gastos]);

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);

		if (presupuestoLS > 0) {
			setIsValidPresupuesto(true);
		}
	}, []);

	const guardarGasto = gasto => {
		if (gasto.id) {
			const gastosActualizados = gastos.map(gastoState =>
				gastoState.id === gasto.id ? gasto : gastoState
			);
			setGastos(gastosActualizados);
		} else {
			gasto.id = generarId();
			gasto.fecha = Date.now();
			setGastos([...gastos, gasto]);
		}

		setModal(false);
		console.log(gasto);
	};

	return (
		<div>
			<Header
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>

			{isValidPresupuesto && (
				<>
					<Filtros setFiltro={setFiltro} filtro={filtro} />
					<ListadoGastos
						gastos={gastos}
						gastosFiltrados={gastosFiltrados}
						filtro={filtro}
						setGastoEditar={setGastoEditar}
						eliminarGasto={eliminarGasto}
					/>
				</>
			)}

			{isValidPresupuesto && (
				<>
					<Plus onClick={handleNuevoGasto} className='plus-icon' />
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
};

export default App;
