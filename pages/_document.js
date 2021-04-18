import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="es">
        <Head>
          <title>
            Negocios del Barrio
          </title>
          <meta
            name="description"
            content="Encuentra todo lo que necesitas en tu Colonia o Barrio. Todos los negocios cerca de ti"
          />
          <meta
            name="description"
            content="Puestos de Comida. Comercios y establecimientos"
          />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
