import axios from 'axios'

const apiBookBiblia = axios.create({
  baseURL: 'https://www.abibliadigital.com.br/api/books',
})

export default apiBookBiblia
