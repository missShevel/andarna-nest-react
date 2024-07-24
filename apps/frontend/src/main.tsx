import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './app/app';
import AuthProvider from './firebase/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
