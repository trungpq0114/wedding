import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function GsapImage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray<HTMLElement>('.gsap-image');

      // Set initial positions and rotations
      gsap.set(images[0], { x: -100, rotation: -45 }); // Left image starts rotated
      gsap.set(images[1], { x: 100, rotation: 45 }); // Right image starts rotated

      // Animate left image (move right to center + rotate to 0)
      gsap.to(images[0], {
        x: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: images[0],
          start: 'bottom bottom',
          end: 'top 20%',
          scrub: true,
        },
      });

      // Animate right image (move left to center + rotate to 0)
      gsap.to(images[1], {
        x: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: images[1],
          start: 'bottom bottom',
          end: 'top 20%',
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section className='relative w-full min-h-[200px] flex items-center justify-center overflow-hidden px-4'>
      <div
        ref={container}
        className='grid grid-cols-2 w-full max-w-5xl gap-4 lg:gap-10'
      >
        <img
          src='/optimized/76-w1600.webp'
          alt='image left'
          className='gsap-image object-cover rounded-2xl shadow-lg'
        />

        <img
          src='/optimized/75-w1600.webp'
          alt='image right'
          className='gsap-image object-cover rounded-2xl shadow-lg'
        />
      </div>
    </section>
  );
}
