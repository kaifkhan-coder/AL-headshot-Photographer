import type { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey Backdrop',
    description: 'A classic, professional look with a simple and clean background.',
    prompt: 'Generate a professional corporate headshot of the person in the image. They should be wearing professional business attire, looking confident and approachable. The background should be a solid, neutral light grey. The lighting should be soft and even, typical of a studio portrait.',
    imageUrl: 'https://picsum.photos/seed/corporate/300/300'
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    description: 'A contemporary headshot with a blurred, modern office setting.',
    prompt: 'Create a modern professional headshot of the person in the image, suitable for a tech industry professional. They should be wearing smart-casual business attire. The background should be a slightly blurred, bright, modern office with elements like glass walls and natural light. The person should appear innovative and friendly.',
    imageUrl: 'https://picsum.photos/seed/tech/300/300'
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural Light',
    description: 'A warm and friendly headshot taken outdoors with natural lighting.',
    prompt: 'Produce a warm and approachable outdoor headshot of the person in the image. They should be dressed in casual or business-casual clothing. The background should be a softly-focused natural setting, like a park or urban greenery. The lighting should be bright, natural, and flattering, as if taken during the golden hour.',
    imageUrl: 'https://picsum.photos/seed/outdoor/300/300'
  },
  {
    id: 'black-and-white',
    name: 'Artistic Black & White',
    description: 'A dramatic and timeless black and white portrait.',
    prompt: 'Transform the image into a dramatic, artistic black and white headshot. The lighting should be high-contrast, creating strong shadows and highlights (chiaroscuro effect). The person should have a thoughtful or powerful expression. The background should be dark and simple.',
    imageUrl: 'https://picsum.photos/seed/bw/300/300'
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'For the modern creative, set against a textured, artistic backdrop.',
    prompt: 'Generate a headshot for a creative professional (like a designer or artist). The person should look approachable and innovative. The background should be a textured wall (like exposed brick or a painted canvas) with soft, artistic lighting.',
    imageUrl: 'https://picsum.photos/seed/creative/300/300'
  },
  {
    id: 'academic-library',
    name: 'Academic Library',
    description: 'A scholarly look with a warm, book-lined background.',
    prompt: 'Create a professional headshot suitable for an academic, author, or researcher. The person should appear thoughtful and knowledgeable. The background should be a warm, softly-focused library or study with bookshelves. The lighting should be warm and inviting.',
    imageUrl: 'https://picsum.photos/seed/academic/300/300'
  },
  {
    id: 'minimalist-white',
    name: 'Minimalist White',
    description: 'A crisp, clean, and modern headshot on a pure white background.',
    prompt: 'Produce a clean, modern, high-key headshot of the person in the image against a pure white background. The person should be wearing simple, stylish clothing. The lighting should be bright and even, minimizing shadows for a fresh and airy feel.',
    imageUrl: 'https://picsum.photos/seed/minimalist/300/300'
  },
];