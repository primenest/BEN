import axios from 'axios'

const qs = require('qs')

function getIdToken () {
  if (typeof (sessionStorage) !== 'undefined' && typeof (sessionStorage.TokenReg) !== 'undefined') {
    return sessionStorage.getItem('TokenReg')
  }
  return false
}

async function isValidoToken (token) {
  return axios.post('/nmd/index.php', qs.stringify({
    cls: '_ValidarToken',
    Token: token
  })).catch((error) => {
    console.log(error)
  })
}

function destroyStorage (next) {
  sessionStorage.clear()
  next({ path: '/' })
}

export function requireAuth (to, from, next) {
  const idToken = getIdToken()
  if (!idToken) {
    next({ path: '/' })
  } else {
    isValidoToken(idToken).then((response) => {
      if (response.data) next(); else destroyStorage(next)
    }).catch((error) => {
      // eslint-disable-next-line
      console.log(error);
    })
  }
}
