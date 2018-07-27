import Navigo from 'navigo';
import firebase from 'firebase';
import catchLinks from 'catch-links';

import listado from './modulos/listado';
import nuevo from './modulos/nuevo';
import busqueda from './modulos/busqueda';

import firebaseConfig from '../firebase.config';
import firebaseui from 'firebaseui';

import './index.scss';

firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
const database = firebase.firestore();

var root = null;
var useHash = false;

var router = new Navigo(root, useHash);

router
	.on({
		'listado': () => listado(database),
		'nuevo': () => nuevo(database),
		'busqueda': () => busqueda (database),
	})
	.resolve();

catchLinks(window, function (href) {
    router.navigate(href);
});

var uiConfig = {
	callbacks: {
	  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
		console.log('ok')
		return true;
	  },
	  uiShown: function() {
		// The widget is rendered.
		// Hide the loader.
		document.getElementById('loader').style.display = 'none';
	  }
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: 'listado',
	signInOptions: [
	  // Leave the lines as is for the providers you want to offer your users.
	  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	],
	// Terms of service url.
	tosUrl: 'terms'
	
  };

  firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var photoURL = user.photoURL;
		var displayName = user.displayName;
		var email = user.email;
		console.log(photoURL);
		console.log(displayName);
		console.log(email);
		

		if (document.getElementById('logueado')) document.getElementById('logueado').style.display = 'block';
		if (document.getElementById('login')) document.getElementById('login').style.display = 'none';
		
		document.getElementById('botonlogout').addEventListener('click', function() {
			firebase.auth().signOut().then(function() {
				location.reload(true);
		    }).catch(function(error) {
			  // An error happened.
		    });/*authService.signOut()*/
		})
	} else {
		ui.start('#login', uiConfig);
	}
	});

	