import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path';

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const vite_env = loadEnv(mode, process.cwd());
  return {
    base: vite_env.VITE_APP_LINK_TO_PATH || './',
    define: {
      // If you want to exposes all env variables, which is not recommended
      // 'process.env': env
    },
    build: {
      outDir: path.resolve(__dirname, `dist/${vite_env.VITE_APP_BUILD_DIR}`),
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {

        scss: {
          // Add any custom SCSS options here    
          functions: {
            'env($key)': function (key) {
              //console.log('process::',process.env)
              return `${import.meta.env[key]}` || key;
            },
          },
        },
      },
    },
  };
});