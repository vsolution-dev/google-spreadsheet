import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    { file: 'dist/bundle.cjs.js', format: 'cjs' },
    { file: 'dist/bundle.esm.js', format: 'es' }
  ],
  external: ['googleapis'],
  plugins: [
    typescript(),
  ]
}
