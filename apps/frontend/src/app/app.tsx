import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUpPage } from '../pages';
import SignInPage from '../pages/sign-in';
import ProfilePage from '../pages/profile';
import HomePage from '../pages/home';
import PrivateRoute from '../components/PrivateRoute';
import PageNotFound from '../pages/404-not-found';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}

export default App;
