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
import { setTheme, themeStateSelector } from './store/theme/themeSlice';
import { loadTracksAsync } from './store/track/asyncActions/asyncTrackActions';

export const App = (): JSX.Element => {

  const dispatch = useDispatch();

  /**
   * If the user would like dark mode we will apply it on application load
   * Load the saved tracks from the database async
   */
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme(true));
    }

    dispatch(loadTracksAsync());
  }, [dispatch]);

  const usingDarkMode = useSelector(themeStateSelector);
  const rootElement = window.document.documentElement;
  if (usingDarkMode) {
      rootElement.classList.add("dark");
  } else {
    rootElement.classList.remove("dark");
  }

  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-gray-100 dark:bg-gray-700 dark:text-white">
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
    </main>
  );
}
