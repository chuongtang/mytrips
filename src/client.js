import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// console.log ("ID dayyy",memoriesProjectId);
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'memdata',
  apiVersion: '2023-05-03',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

