import serve from 'rollup-plugin-serve'

export default {
  input: './examples/js/index.js',
  output: {
    file: './examples/dist/indexjs',
    format: 'es',
  },
  plugins: [
    serve({
      open: true,
      host: 'localhost',
      port: 3131,
      contentBase: ['examples'],
      onListening: function (server) {
        const address = server.address().address
        const port = server.address().port
        const protocol = this.https ? 'https' : 'http'
        console.log(`Server listening at ${protocol}://${address}:${port}/`)
      },
    }),
  ],
}
