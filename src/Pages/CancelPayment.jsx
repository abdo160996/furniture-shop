import React from 'react'
import { TbUserCancel, TbX } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function CancelPayment() {
  return (
    <div className='flex flex-col gap-6 items-center justify-center min-h-[500px]'>
         <TbUserCancel size={90} color="red" />
      <h1 className="text-3xl font-bold">Payment Cancelled</h1>
        <Link to="/"><button className="btn btn-secondary">Back to Home</button></Link>

    </div>
  )
}

export default CancelPayment