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
		//document.getElementById('loader').style.display = 'none';
		document.getElementById('logout').style.display = 'none';
	
	  }
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: 'main',
	signInOptions: [
	  // Leave the lines as is for the providers you want to offer your users.
	  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	],
	// Terms of service url.
	tosUrl: 'terms'
  };



	function mylogout() {
		
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
			location.reload(true);
	
			
		}).catch(function(error) {
			// An error happened.
		});
		console.warn("on click");
}

  firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		if (document.getElementById('logout')) {document.getElementById('logout').style.display = 'block';
																						document.getElementById('logueado').style.display = 'block';
																						document.getElementById('b_logout').addEventListener("click", mylogout);}
		if (document.getElementById('login')) document.getElementById('login').style.display = 'none';
	} else {
		ui.start('#login', uiConfig);
	}
  });