import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";
//import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],
  
  kit: {
    adapter: adapter(),
  },

  preprocess: [vitePreprocess({})],
};

export default config;
