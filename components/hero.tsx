'use client'

import Image from 'next/image'
import HeroImage from '@/public/images/hero.png'

export default function Hero() {

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16 text-black">
            <h1 className="h1 mb-4" data-aos="fade-up">Arvault is the better AR publishing platform</h1>
            <p className="text-xl text-gray-700 mb-8" data-aos="fade-up" data-aos-delay="200">Instant 3D experiences for anyone.</p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn rounded-md text-white bg-teal-500 hover:bg-teal-800 w-full mb-4 sm:w-auto sm:mb-0" href="https://auth-arvault.vercel.app/">Start creating</a>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a className="btn rounded-md text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div className="relative flex justify-center items-center" data-aos="fade-up" data-aos-delay="200">
              <Image
                src={HeroImage}
                width={1024}
                alt="Hero"
                priority
              />
            </div>
            
            {/* Modal */}

          </div>

        </div>

      </div>
    </section>
  )
}
