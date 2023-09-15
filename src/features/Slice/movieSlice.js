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
  isLoading: true,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAsyncMovie.fulfilled, (state, action) => {
      console.log("Fetch Successfully");
      state.isLoading = false;
      state.movies = action.payload;
    });

    builder.addCase(fetchAsyncMovie.rejected, () => {
      console.log("Rejected!");
    });

    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("Fetch Successfully");
      state.shows = action.payload;
    });

    builder.addCase(fetchAsyncMovirOrShowDetail.fulfilled, (state, action) => {
      console.log("Fetch Successfully");
      state.selectedMovieOrShow = action.payload;
    });
  },
});

export const { removeSelectedMovieOrShow, isLoading } = movieSlice.actions;
export const getIsLoading = (state) => state.movies.isLoading;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllMovirOrShow = (state) => state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
