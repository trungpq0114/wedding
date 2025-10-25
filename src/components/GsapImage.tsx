import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
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
          end: 'top 50%',
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
          end: 'top 50%',
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className='w-full h-[302px] flex items-center gap-4'>
      <div>
        <img
          src='/optimized/76-w1600.webp'
          alt='image'
          loading='lazy'
          className='gsap-image'
        />
      </div>

      <div>
        <img
          src='/optimized/75-w1600.webp'
          alt='image'
          loading='lazy'
          className='gsap-image'
        />
      </div>
    </div>
  );
}
