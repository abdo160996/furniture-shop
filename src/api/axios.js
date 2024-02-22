import axios from 'axios'

 export const client = axios.create({
  baseURL:"https://my-json-server.typicode.com/abdo160996/furniture-shop",
})

export const request =(options)=>{
  client.defaults.headers.common.Authorization = `Bearer token`;
 
  return client(options)
}

