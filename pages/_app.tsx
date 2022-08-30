import { store } from 'components/Redux/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <div hidden className='bg-red-600 bg-orange-500 bg-lime-500 bg-gray-700 bg-gray-400'></div>
      </Provider>
  )
}

export default MyApp
