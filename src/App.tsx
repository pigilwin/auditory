import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { AboutPanel } from './about';
import {NavBar} from './components/NavBar';
import {Main} from './Main';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path="/">
          <Main/>
        </Route>
        <Route path="/about">
          <AboutPanel/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
