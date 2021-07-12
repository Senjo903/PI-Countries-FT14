import './normalize.css';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MainBar from './components/MainBar';
import Home from './views/home';
import CountryDetails from './views/country-details';
import RegisterActivity from './views/register-artivity';
import ListOfCountries from './views/list-of-countries';

function App() {
  return (
    <div className="App">
      <Route path="/" component={MainBar} />
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/country-details/:countryID" exact component={CountryDetails}/>
      <Route path="/register-artivity" exact component={RegisterActivity}/>
      <Route path="/list-of-countries" exact component={ListOfCountries}/>
      </Switch>
    </div>
  );
}

export default App;
