import Layout from '@comps/Layout'
import { UserProvider } from 'src/context/UserContext'
import 'styles/global.css'

function MyApp ({ Component, pageProps }) {
  const AppLayout = Layout
  return (
    <UserProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </UserProvider>
  )
}

export default MyApp
