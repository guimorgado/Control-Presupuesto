/* eslint-disable react/prop-types */
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatearFecha } from '../helpers';
import IconoOcio from '../img/cocktail.png';
import IconoGastos from '../img/expenses.png';
import IconoComida from '../img/fast-food.png';
import IconoSalud from '../img/health-care.png';
import IconoCasa from '../img/home.png';
import IconoAhorro from '../img/save-money.png';
import IconoSuscripciones from '../img/subscription.png';

const diccionarioIconos = {
	ahorro: IconoAhorro,
	comida: IconoComida,
	casa: IconoCasa,
	gastos: IconoGastos,
	ocio: IconoOcio,
	salud: IconoSalud,
	suscripciones: IconoSuscripciones
};

const ListadoGastos = ({
	gastos,
	setGastoEditar,
	eliminarGasto,
	filtro,
	gastosFiltrados
}) => {
	const formatearCantidad = cantidad => {
		return cantidad.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	};

	return (
		<div className='list-gastos'>
			<div>
				{filtro ? (
					<>
						<h1>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos'}</h1>
						<p>
							{gastosFiltrados.length
								? 'Arrastra para izquierda si quieres borrar y para derecha si quieres editar'
								: ''}
						</p>
						<div className='list-grid'>
							{gastosFiltrados.map(gasto => {
								const leadingActions = () => (
									<LeadingActions>
										<SwipeAction onClick={() => setGastoEditar(gasto)}>
											Editar
										</SwipeAction>
									</LeadingActions>
								);

								const trailingActions = () => (
									<TrailingActions>
										<SwipeAction
											onClick={() => eliminarGasto(gasto.id)}
											destructive={true}
										>
											Eliminar
										</SwipeAction>
									</TrailingActions>
								);

								return (
									<SwipeableList key='gasto.id'>
										<SwipeableListItem
											leadingActions={leadingActions()}
											trailingActions={trailingActions()}
										>
											<div className='container-master-gasto'>
												<div className='container-gasto'>
													<div className=''>
														<div className='img-categoria'>
															<img src={diccionarioIconos[gasto.categoria]} />

															<p className='text-categoria'>
																{gasto.categoria.toUpperCase()}
															</p>
														</div>
														<div>
															<p className='text-nombre'>{gasto.nombre}</p>
															<p className='text-cantidad'>
																{formatearCantidad(gasto.cantidad)}
															</p>
														</div>
													</div>
												</div>
												<div>
													<p className='text-fecha'>
														<b>Agregado el:</b> {''}{' '}
														<span>{formatearFecha(gasto.fecha)}</span>
													</p>
												</div>
											</div>
										</SwipeableListItem>
									</SwipeableList>
								);
							})}
						</div>
					</>
				) : (
					<>
						<h1>{gastos.length ? 'Gastos' : 'No hay gastos'}</h1>
						<p>
							{gastos.length
								? 'Arrastra para izquierda si quieres borrar y para derecha si quieres editar'
								: ''}
						</p>
						<div className='list-grid'>
							{gastos.map(gasto => {
								const leadingActions = () => (
									<LeadingActions>
										<SwipeAction onClick={() => setGastoEditar(gasto)}>
											Editar
										</SwipeAction>
									</LeadingActions>
								);

								const trailingActions = () => (
									<TrailingActions>
										<SwipeAction
											onClick={() => eliminarGasto(gasto.id)}
											destructive={true}
										>
											Eliminar
										</SwipeAction>
									</TrailingActions>
								);

								return (
									<SwipeableList key='gasto.id'>
										<SwipeableListItem
											leadingActions={leadingActions()}
											trailingActions={trailingActions()}
										>
											<div className='container-master-gasto'>
												<div className='container-gasto'>
													<div className=''>
														<div className='img-categoria'>
															<img src={diccionarioIconos[gasto.categoria]} />

															<p className='text-categoria'>
																{gasto.categoria.toUpperCase()}
															</p>
														</div>
														<div>
															<p className='text-nombre'>{gasto.nombre}</p>
															<p className='text-cantidad'>
																{formatearCantidad(gasto.cantidad)}
															</p>
														</div>
													</div>
												</div>
												<div>
													<p className='text-fecha'>
														<b>Agregado el:</b> {''}{' '}
														<span>{formatearFecha(gasto.fecha)}</span>
													</p>
												</div>
											</div>
										</SwipeableListItem>
									</SwipeableList>
								);
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ListadoGastos;
