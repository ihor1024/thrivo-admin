import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
		  output: {
			intro: 'if(exports === undefined){var exports ={}; var self = {}}',
		  },
		},
	  },
	  resolve: {
		alias: {
		  './runtimeConfig': './runtimeConfig.browser',
		  $static: path.resolve('./static'),
		  $stores: path.resolve('./src/stores'),
		  $components: path.resolve('./src/components'),
		  $helpers: path.resolve('./src/helpers'),
		  $graphql: path.resolve('./src/graphql'),
		  $data: path.resolve('./src/data'),
		  $src: path.resolve('./src')
		},
	  },
};

export default config;
