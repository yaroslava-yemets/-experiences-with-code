import './App.css';
import * as code from './code';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Modal from './components/Modal/Modal';
import AboutUsView from './views/AboutUsView';
console.log(Object.getPrototypeOf(code));


function App() {
  return (
    <div className="App">
      <Header />
    <Switch>
      <Route path="/" exact>
        <div>Home</div>
      </Route>
      <Route path="/aboutUs">
        <AboutUsView />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
