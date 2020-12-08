import {useEffect} from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { AboutPanel } from './about/about';
import { NavBar } from './components/NavBar';
import { Context } from './Context';
import { database } from './database/database';
import { Main } from './builder/Main';

function App() {

  useEffect(() => {
    (async () => {
      Context.load(await database(), new AudioContext());
    })();
  });

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
