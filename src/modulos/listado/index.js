
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
	const lista = database
	.collection('motos').orderBy('marca');
	const allMotos = lista.get()
	.then(snapshot => {
		snapshot.forEach(element => {
			const datosmotos = element.data();
			datosmotos.id = element.key;
			motos.push(datosmotos);
			console.log(element.data());
			
		});
		render();
	})
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ motos });
}

