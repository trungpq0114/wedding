/// <reference types="vite/client" />

interface ImageToolsSource {
  srcset: string;
  type: string;
}

interface ImageToolsPicture {
  sources: ImageToolsSource[];
  img: {
    src: string;
    w: number;
    h: number;
  };
}

// Vite ImageTools type definitions
declare module '*.jpg?*' {
  const value: ImageToolsPicture;
  export default value;
}

declare module '*.jpeg?*' {
  const value: ImageToolsPicture;
  export default value;
}

declare module '*.png?*' {
  const value: ImageToolsPicture;
  export default value;
}

declare module '*.webp?*' {
  const value: ImageToolsPicture;
  export default value;
}

declare module '*.avif?*' {
  const value: ImageToolsPicture;
  export default value;
}

// Allow importing plain CSS files (including third-party CSS like swiper)
declare module '*.css';

// Some third-party packages import sub-path CSS modules (swiper).
// Provide explicit declarations to avoid "Cannot find module '.../css'" errors.
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/effect-coverflow';
declare module 'swiper/css/effect-creative';
declare module 'swiper/css/effect-creative';
declare module 'swiper/css/effect-cards';
