import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { AboutPanel } from './about/about';
import { NavBar } from './components/NavBar';
import { Main } from './main/Main';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path="/about">
          <AboutPanel/>
        </Route>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
