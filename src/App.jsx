import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchData } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfig, getGenres } from './store/homeSlice';
import Home from './pages/Home';
import Error from './pages/Error';
import Details from './pages/Details';
import Explore from './pages/Explore';
import SearchResults from './pages/SearchResuls';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  // Fetch api and save it to store______________

  const { url } = useSelector((state) => state.home);

  console.log(url);
  const fetchApiConfig = () => {
    fetchData('/configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfig(url));
    });
  };

  // Fetch Genres and save it to store______________________

  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  // Call function/methods_______________

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  return (
    <BrowserRouter>
      <div className="bg-gray-900 ">
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
