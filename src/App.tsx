import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { AboutPanel } from './about/About';
import { NavBar } from './components/Nav/NavBar';
import { Main } from './builder/Main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTracksAsync } from './store/track/trackEvent';
import { Settings } from './settings/Settings';
import { setTheme, themeStateSelector } from './store/theme/themeSlice';

export const App = (): JSX.Element => {

  const dispatch = useDispatch();

  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme(true));
    }

    dispatch(loadTracksAsync());
  }, [dispatch]);

  const usingDarkMode = useSelector(themeStateSelector);
  const rootElement = window.document.documentElement;
  const classNames: string[] = [
      "font-sans",
      "antialiased",
      "leading-normal",
      "tracking-wider",
      "bg-gray-100",
      "dark:bg-gray-700"
  ];

  if (usingDarkMode) {
      rootElement.classList.add("dark");
  } else {
    rootElement.classList.remove("dark");
  }

  return (
    <main className={classNames.join(" ")}>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route path="/about">
            <AboutPanel/>
          </Route>
          <Route path="/settings">
            <Settings/>
          </Route>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}
