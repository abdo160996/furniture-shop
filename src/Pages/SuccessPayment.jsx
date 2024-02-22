import React, { useEffect } from 'react'
import { TbShieldCheckFilled } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function SuccessPayment() {
    useEffect(() => {
       localStorage.removeItem('cart')
    }, [])
  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-[500px]'>
      <h1 className="text-3xl font-bold">Success Payment</h1>
      <TbShieldCheckFilled size={80} color="green" />
        <Link to="/"><button className="btn btn-primary">Back to Home</button></Link>
    </div>
  )
}

export default SuccessPayment