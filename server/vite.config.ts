import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import { BASIC_CONF } from '../vite.config';

// https://vitejs.dev/config/
export default mergeConfig(
  BASIC_CONF,
  defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/server.ts'),
        name: 'adfinity_ui_server',
      },
      // Rollup conf
      rollupOptions: {
        input: {
          main: './src/index.ts',
        },
        output: {
          exports: 'named',
        },
      },
    },
  })
);
