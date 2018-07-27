import Handlebars from 'handlebars';
import template from './template.html';

let database;
let motos = [];

export default (_database) => {
	database = _database;
	motos = [];
	listadomotos();
}

const listadomotos = () => {
	render()
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ motos });
	document.getElementById('boton-buscar').onclick = realizarBusqueda;
}

const realizarBusqueda = () => {
	const busqueda = document.getElementById('buscar').value;
	motos = [];
	if (busqueda === ''){
		listadomotos ();
		return;
	}
	const lista = database
	.collection('motos')
	.where('marca','==',busqueda)
	const searchMotos = lista.get()
	.then(snapshot => {
		snapshot.forEach(element => {
		const datosmotos = element.data();
		datosmotos.id = element.key;
		motos.push(datosmotos);
		//console.log(element.data());
		});
		render();
	})

}