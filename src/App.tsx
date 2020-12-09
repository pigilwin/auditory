import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { AboutPanel } from './about/About';
import { LoadPanel } from './load/Load';
import { NavBar } from './components/NavBar';
import { Main } from './builder/Main';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route path="/about">
          <AboutPanel/>
        </Route>
        <Route path="/load">
          <LoadPanel/>
        </Route>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
