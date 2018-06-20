import axios from 'axios'

const qs = require('qs')

function limpiarToken (token) {
  axios.post('/nmd/index.php', qs.stringify({
    cls: '_LimpiarToken',
    Token: token
  }))
}

export default function cerrarSesion () {
  if (typeof (sessionStorage) !== 'undefined' && typeof (sessionStorage.TokenReg) !== 'undefined') {
    limpiarToken(sessionStorage.getItem('TokenReg'))
    // return sessionStorage.getItem('TokenReg');
  }
  // return false;
}
/* function cerrarSesion() {
  const idToken = getIdToken();
  if (idToken) {
    limpiarToken(idToken);
  }
} */
