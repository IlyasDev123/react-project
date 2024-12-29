import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { store, persistor } from './shared/redux/store';
import Toast from './shared/components/toast';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <React.StrictMode> */}
        <App />
        <Toast />
        {/* </React.StrictMode> */}
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
