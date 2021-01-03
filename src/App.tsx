import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { AboutPanel } from './about/About';
import { LoadPanel } from './load/Load';
import { NavBar } from './components/NavBar';
import { Main } from './builder/Main';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTracksAsync } from './store/track/trackEvent';

export const App = (): JSX.Element => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTracksAsync());
  });

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
