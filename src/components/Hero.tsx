import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="pt-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="block">Websites und Software</span>
            <span className="block">die <span className="text-indigo-600">Unternehmen</span></span>
            <span className="block">voranbringen.</span>
          </h1>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-radial from-indigo-200 via-white to-white rounded-3xl" />
          
          <div className="relative">
            <div className="relative md:w-1/3 w-2/3 mx-auto aspect-square">
              <Image
                src="/images/florian-buchmann.png"
                alt="Profile"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="absolute md:left-1/4 md:top-2/4 top-[-50px] bg-white rounded-full py-2 px-4 shadow-lg animate-float">
              <p className="font-bold">Softwareentwicklung</p>
              <p className="text-indigo-600 text-sm text-center">+7 Jahre</p>
            </div>
            
            <div className="absolute md:right-1/4 md:top-3/4 right-0 max-md:bottom-[30px] bg-white rounded-full py-2 px-4 shadow-lg animate-float-delayed">
              <p className="font-bold">Webdesign</p>
              <p className="text-indigo-600 text-sm text-center">+12 Jahre</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}