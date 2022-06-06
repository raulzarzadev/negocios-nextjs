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
      <Html lang='es'>
        <Head>
          <meta charSet="utf-8" />
          <meta lang="es" />

          <meta
            name="description"
            content={`
            Publica y comparte servicios, productos, ofertas y promociones de tu negocio. Hazte presente en intert. 
            Encuentra productos y servicios cerca de tí.
            `}
          />
          <link rel="icon" href="/logo.png" />
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
