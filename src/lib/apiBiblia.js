import axios from 'axios'

const apiBiblia = axios.create({
  baseURL: 'https://www.abibliadigital.com.br/api/verses/nvi',
})

export default apiBiblia
