import { lazy, Suspense } from 'react';
import AppStyle from './App.module.css';
import LinksStyled from '../pages/LinksStyled.module.css';
import { Routes, Route, Link } from 'react-router-dom';
// import Home from 'pages/Home';
// import { Movies } from 'pages/Movies';
// import { MovieDetails } from './MovieDetails/MovieDetails';
// import { Cast } from './Cast/Cast';
// import { Reviews } from './Reviews/Reviews';
// import { NotFound } from './NotFound/NotFound';
// import { MovieResults } from "./MovieResults/MovieResults";

const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const NotFound = lazy(() => import('components/NotFound/NotFound'));
// const MovieResults = lazy(() => import('components/MovieResults/MovieResults'));

export const App = () => {
  return (
    <div>
      <nav className={AppStyle.nav_style}>
        <Link to="/" className={LinksStyled.link_styled}>
          Home
        </Link>
        <Link to="/movies" className={LinksStyled.link_styled}>
          Movies
        </Link>
      </nav>
      <Suspense fallback={<div>Завантаження...</div>}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:itemId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};
