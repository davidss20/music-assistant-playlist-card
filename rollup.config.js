import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/music-assistant-playlist-card.ts',
  output: {
    file: 'dist/music-assistant-playlist-card.js',
    format: 'es',
    sourcemap: !production,
  },
  plugins: [
    json(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
    }),
    production && terser({
      format: {
        comments: false,
      },
    }),
  ],
};

