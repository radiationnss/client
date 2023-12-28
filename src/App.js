import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import {
  BlogDetails,
  CategoriesPage,
  Home,
  LoginPage,
  SignupPage,
  WriterPage,
} from "./pages";
import axios from "axios";
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL } from "../src/actions/types";
import Loading from "./components/Loading";
import { useEffect } from "react";
import queryString from "query-string";
import { useDispatch } from 'react-redux';

const googleAuthenticate = async (state, code, dispatch) => {
  if (state && code) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const details = {
      'state': state,
      'code': code
    }

    const response = await axios.post('http://127.0.0.1:8000/api/users/google/all-auth', { code, state });
    console.log(response)

    // const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

    // try {
    //   const res = await axios.post(`http://127.0.0.1:8000/auth/o/google-oauth2/?${formBody}`, config)
    //   console.log(formBody)

    //   dispatch({
    //     type: GOOGLE_AUTH_SUCCESS,
    //     payload: res.data
    //   })
    // } catch (err) {
    //   dispatch({
    //     type: GOOGLE_AUTH_FAIL
    //   })
    // }
  }
}

function Layout() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const values = queryString.parse(location.search)
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    console.log(state)
    console.log(code)

    // Call the googleAuthenticate function
    googleAuthenticate(state, code, dispatch);
  }, [location, dispatch]);

  return (
    <div className='w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-28'>
      { /*<Navbar /> */}
      <div className='flex-1'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

// ... rest of the code remains unchanged

function App() {
  const theme = "dark";
  const isLoading = false;

  return (
    <main className={theme}>
      <div className={`w-full min-h-sreen relative dark:bg-[#020b19] bg-white`}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/category' element={<CategoriesPage />} />
            <Route path='/:slug/:id?' element={<BlogDetails />} />
            <Route path='/writer/:id' element={<WriterPage />} />
          </Route>

          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/sign-in' element={<LoginPage />} />
        </Routes>

        {isLoading && <Loading />}
      </div>
    </main>
  );
}
export default App;
