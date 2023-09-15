import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import user from "../../images/user.png";
import "./Header.scss";
import {
  fetchAsyncMovie,
  fetchAsyncShows,
} from "../../features/Slice/movieSlice";
const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("please Enter search term!");
    dispatch(fetchAsyncMovie(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Movie App </Link>
      </div>
      <div className='search-bar'>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            value={term}
            placeholder='Search Movies or Shows'
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type='submit'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div className='user-image'>
        <img src={user} alt='' />
      </div>
    </header>
  );
};
export default Header;
