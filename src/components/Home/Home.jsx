import { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovie,
  fetchAsyncShows,
} from "../../features/Slice/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Iron man";
  const ShowText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovie(movieText));
    dispatch(fetchAsyncShows(ShowText));
  }, [dispatch]);

  return (
    <div>
      <div className='banner-img'>
        <MovieListing />
      </div>
    </div>
  );
};
export default Home;
