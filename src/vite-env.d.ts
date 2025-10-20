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
