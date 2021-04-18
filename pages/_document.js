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
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,  user-scalable=0"
          />
          <meta
            name="description"
            content="Encuentra todo lo que necesitas en tu Colonia o Barrio. Todos los negocios cerca de ti"
            />
          <meta
            name="description"
            content="Puestos de Comida. Comercios y establecimientos"
            />
            <title>Negocios del Barrio</title>
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
