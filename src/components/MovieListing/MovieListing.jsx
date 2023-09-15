import Slider from "react-slick";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/Slice/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import { settings } from "./settings";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const Shows = useSelector(getAllShows);

  let renderMovies,
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div ClassName='movies-error'>
        <h3>{movies.Error}</h3>
      </div>
    );
  renderShows =
    Shows.Response === "True" ? (
      Shows.Search.map((movie, index) => <MovieCard key={index} data={movie} />)
    ) : (
      <div ClassName='movies-error'>
        <h3>{movies.Error}</h3>
      </div>
    );
  return (
    <div className='movie-wapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        <div className='movie-container'>
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className='movie-list'>
        <h2>Shows</h2>
        <div className='movie-container'>
          <Slider {...settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  );
};
export default MovieListing;
