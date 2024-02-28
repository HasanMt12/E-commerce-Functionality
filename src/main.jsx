// Provider components wrap the App component to provide Redux store and QueryClient to the entire app.
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from "./store";
import  { CartProvider } from './Context/CartContextProvider.jsx'
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     {/* QueryClientProvider to provide the QueryClient to the entire app */}
    <QueryClientProvider client={queryClient}>
      <CartProvider>  
        <App />
      </CartProvider>  
    </QueryClientProvider>
  </Provider>
)

// Provider components wrap the App component to provide Redux store and QueryClient to the entire app.