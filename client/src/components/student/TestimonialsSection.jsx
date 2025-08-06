import React from 'react'
import { dummyTestimonial } from '../../assets/assets'
import { assets } from '../../assets/assets' // make sure assets.star and star_blank exist

const TestimonialsSection = () => {
  return (
    <div className='text-center pb-14 px-4 sm:px-8 md:px-12'>
      <h2 className='text-3xl font-semibold text-gray-800'>Testimonials</h2>
      <p className='text-sm sm:text-base text-gray-500 mt-3'>
        Hear from our learners as they share their journeys of transformation, success, and how our <br className='hidden sm:block' /> platform has made a difference in their lives.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14'>
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className='flex flex-col justify-between min-h-[300px] border border-gray-300 rounded-xl bg-white shadow-md overflow-hidden'
          >
            {/* Card Header */}
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-100'>
              <img className='h-12 w-12 rounded-full object-cover' src={testimonial.image} alt={testimonial.name} />
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>{testimonial.name}</h3>
                <p className='text-sm text-gray-600'>{testimonial.role}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className='p-5'>
              <div className='flex gap-1 mb-3'>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className='h-4 w-4'
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt='star'
                  />
                ))}
              </div>
              <p className='text-sm text-gray-600'>{testimonial.feedback}</p>
            </div>
            <a href="#" className='text-blue-500 underline px-5'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
