import React from 'react'

function SectionIntro({spanText,h2Text}) {
  return (
    <div className="info text-center">
        <span className=" block text-lg bg-whitesmoke text-orange w-fit mx-auto px-6">{spanText}</span>
        <h2 className="my-4 text-2xl lg:text-5xl tracking-tight leading-10 font-medium text-black">{h2Text}</h2>
        <p className="text-gray font-OpenSans text-sm md:text-lg max-w-[290px] md:max-w-[500px] mx-auto  ">  Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
  )
}

export default SectionIntro