import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovie = createAsyncThunk(
  "Slice/fetchAsyncMovie",
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "Slice/fetchAsyncShows",
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);
export const fetchAsyncMovirOrShowDetail = createAsyncThunk(
  "Slice/fetchAsyncMovirOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  isLoading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovie.pending, (state, action) => {});
    builder.addCase(fetchAsyncMovie.fulfilled, (state, action) => {
      console.log("Fetch Successfully");
      return { ...state, movies: action.payload };
    });

    builder.addCase(fetchAsyncMovie.rejected, () => {
      console.log("Rejected!");
    });

    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      console.log("Fetch Successfully");
      return { ...state, shows: action.payload };
    });

    builder.addCase(fetchAsyncMovirOrShowDetail.fulfilled, (state, action) => {
      console.log("Fetch Successfully");
      return { ...state, selectedMovieOrShow: action.payload };
    });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllMovirOrShow = (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
