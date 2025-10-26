import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function GsapImage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images = gsap.utils.toArray<HTMLElement>(".gsap-image");

    // Xóa mọi ScrollTrigger cũ khi resize
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (window.innerWidth >= 1024) {
      // 💻 Desktop: có hiệu ứng trượt nhẹ
      gsap.set(images[0], { x: -100, rotation: -20 });
      gsap.set(images[1], { x: 100, rotation: 20 });

      gsap.to(images[0], {
        x: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      gsap.to(images[1], {
        x: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          end: "bottom 70%",
          scrub: true,
        },
      });
    } else {
      // 📱 Mobile: giữ ảnh gần nhau, không hiệu ứng
      gsap.set(images, { x: 0, rotation: 0 });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="relative w-full min-h-[200px] flex items-center justify-center overflow-hidden px-4">
      <div
        ref={container}
        className="flex w-full max-w-5xl items-center justify-center gap-4 lg:gap-10"
      >
        <img
          src="/optimized/76-w1600.webp"
          alt="image left"
          className="gsap-image w-[45%] sm:w-[40%] max-w-[400px] object-cover rounded-2xl shadow-lg"
        />
        <img
          src="/optimized/75-w1600.webp"
          alt="image right"
          className="gsap-image w-[45%] sm:w-[40%] max-w-[400px] object-cover rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}
