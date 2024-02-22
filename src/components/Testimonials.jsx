import React from 'react'
import SectionIntro from './SectionIntro'
import TestimonialCard from './TestimonialCard'

function Testimonials() {
  return (
    <section className="my-20 container px-2">
        <SectionIntro spanText="Testimonial Section" h2Text="What Our Customer Say" />

        <div className="testimonials mt-20 grid auto-flow-col grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
        </div>
    </section>
  )
}

export default Testimonials