import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'src/deep-focus-trap.umd.js',
    plugins: [nodeResolve(), terser(), filesize()],
    output: {
      sourcemap: true, //can pass 'inline' for inline source maps
      file: 'dist/deep-focus-trap.umd.min.js',
      format: 'umd',
      name: 'deepFocusTrap',
    },
  },
  {
    input: 'src/index.js',
    plugins: [nodeResolve(), terser(), filesize()],
    output: {
      sourcemap: true, //can pass 'inline' for inline source maps
      file: 'dist/deep-focus-trap.esm.min.js',
      // exports: 'named',
      format: 'es',
    },
  },
  {
    input: 'src/focus-trap.umd.js',
    plugins: [nodeResolve(), terser(), filesize()],
    output: {
      sourcemap: true, //can pass 'inline' for inline source maps
      file: 'dist/focus-trap.umd.min.js',
      format: 'umd',
      name: 'focusTrap',
    },
  },
  {
    input: 'src/focus-trap.js',
    plugins: [nodeResolve(), terser(), filesize()],
    output: {
      sourcemap: true, //can pass 'inline' for inline source maps
      file: 'dist/focus-trap.esm.min.js',
      format: 'es',
    },
  },
]
