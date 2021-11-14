import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Provider } from 'react-redux'
import store from './store'
import AppNavbar from './components/AppNavbar'
import Dashboard from './components/Dashboard'
import axios from 'axios';

// Handle csrf token
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  return (
    <Provider store={store}>
      <AppNavbar/>
      <Dashboard/>
    </Provider>
  );
}

export default App;
