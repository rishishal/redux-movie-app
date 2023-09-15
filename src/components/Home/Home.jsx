import { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovie,
  fetchAsyncShows,
  getIsLoading,
} from "../../features/Slice/movieSlice";
const Home = () => {
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();
  const movieText = "Iron man";
  const ShowText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovie(movieText));
    dispatch(fetchAsyncShows(ShowText));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ fontSize: "1rem", color: "#fff", textAlign: "center" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className='banner-img'>
        <MovieListing />
      </div>
    </div>
  );
};
export default Home;
