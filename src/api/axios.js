import axios from 'axios'

 export const client = axios.create({
  baseURL:"http://localhost:3000",
})

export const request =(options)=>{
  client.defaults.headers.common.Authorization = `Bearer token`;
 
  return client(options)
}

