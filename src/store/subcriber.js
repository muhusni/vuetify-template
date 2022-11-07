import store from '../store'
import axios from 'axios'

store.subscribe((mutation) => {
  // console.log(mutation)
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + mutation.payload
        // axios.defaults.headers.common['content-type'] = 'application/json'
        axios.defaults.headers.common['origin'] = 'posindonesia.co.id'
        localStorage.setItem('token', mutation.payload)
      } else {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('token')
      }
      break;
  }
})
