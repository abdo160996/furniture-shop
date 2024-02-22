
import { request } from "./axios";

export const fetchCategories = () => {
    return request({url : "/categories"})
  };

export const fetchLandingProducts =  () => {
  return request({url : "/products?_limit=8"})
 
  }

  export const fetchAddresses = async () => {
    return request("/addresses")
    
    }