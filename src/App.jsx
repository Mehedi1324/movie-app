import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchData } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfig } from './store/homeSlice';
import Home from './pages/Home';
import Error from './pages/Error';
import Details from './pages/Details';
import Explore from './pages/Explore';
import SearchResults from './pages/SearchResuls';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const fetchApiConfig = () => {
    fetchData('/configuration').then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfig(url));
    });
  };
  useEffect(() => {
    fetchApiConfig();
  }, []);
  return (
    <BrowserRouter>
      <div className="h-full ">
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Details />} path="/:mediaType/:id" />
          <Route element={<SearchResults />} path="/search/:query" />
          <Route element={<Explore />} path="/explore/:mediaType" />
          <Route element={<Error />} path="*" />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
