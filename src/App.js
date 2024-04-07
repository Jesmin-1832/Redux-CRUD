import './App.css';
import Person from './Components/person';
import { Provider } from 'react-redux';
import store from './Redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Person />
      </div>
    </Provider>

  );
}

export default App;
