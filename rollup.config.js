import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: 'src/index.js',
    plugins: [terser(), filesize()],
    output: {
      sourcemap: true, //can pass 'inline' for inline source maps
      file: 'dist/deep-focus.min.js',
      format: 'umd',
      name: '$',
    },
  },
  {
    input: 'src/index.js',
    plugins: [terser(), filesize()],
    output: {
      sourcemap: true, //can pass 'inline' for inline source maps
      file: 'dist/deep-focus.esm.min.js',
      format: 'es',
    },
  },
];
