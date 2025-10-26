import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    fetchMovieDetail,
    fetchMovieTrailer,
    fetchMovieCast
} from "./createAction";

const initialState = {
    popular: { movies: [], status: "idle", error: null },
    nowPlaying: { movies: [], status: "idle", error: null },
    upcoming: { movies: [], status: "idle", error: null },
    topRated: { movies: [], status: "idle", error: null },
    movieDetail: { data: null, status: "idle", error: null },
    trailer: { data: [], status: "idle", error: null },
    cast: { data: [], status: "idle", error: null },
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.pending, (state) => {
                state.popular.status = "Loading popular movies...";
            })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.popular.movies = action.payload;
                state.popular.status = "Popular movies loaded successfully";
            })
            .addCase(fetchPopularMovies.rejected, (state, action) => {
                state.popular.status = "Failed to load popular movies";
                state.popular.error = action.error.message;
            });
        builder
            .addCase(fetchNowPlayingMovies.pending, (state) => {
                state.nowPlaying.status = "Loading now playing movies...";
            })
            .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
                state.nowPlaying.movies = action.payload;
                state.nowPlaying.status = "Now playing movies loaded successfully";
            })
            .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
                state.nowPlaying.status = "Failed to load now playing movies";
                state.nowPlaying.error = action.error.message;
            });
        builder
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.upcoming.status = "Loading upcoming movies...";
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.upcoming.movies = action.payload;
                state.upcoming.status = "Upcoming movies loaded successfully";
            })
            .addCase(fetchUpcomingMovies.rejected, (state, action) => {
                state.upcoming.status = "Failed to load upcoming movies";
                state.upcoming.error = action.error.message;
            });
        builder
            .addCase(fetchTopRatedMovies.pending, (state) => {
                state.topRated.status = "Loading top rated movies...";
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.topRated.movies = action.payload;
                state.topRated.status = "Top rated movies loaded successfully";
            })
            .addCase(fetchTopRatedMovies.rejected, (state, action) => {
                state.topRated.status = "Failed to load top rated movies";
                state.topRated.error = action.error.message;
            });
        builder
            .addCase(fetchMovieDetail.pending, (state) => {
                state.movieDetail.status = "Loading movie detail...";
            })
            .addCase(fetchMovieDetail.fulfilled, (state, action) => {
                state.movieDetail.data = action.payload;
                state.movieDetail.status = "Movie detail loaded successfully";
            })
            .addCase(fetchMovieDetail.rejected, (state, action) => {
                state.movieDetail.status = "Failed to load movie detail";
                state.movieDetail.error = action.payload;
            });
        builder
            .addCase(fetchMovieTrailer.pending, (state) => {
                state.trailer.status = "Loading movie trailer...";
            })
            .addCase(fetchMovieTrailer.fulfilled, (state, action) => {
                state.trailer.data = action.payload;
                state.trailer.status = "Movie trailer loaded successfully";
            })
            .addCase(fetchMovieTrailer.rejected, (state, action) => {
                state.trailer.status = "Failed to load movie trailer";
                state.trailer.error = action.payload;
            });
        builder
            .addCase(fetchMovieCast.pending, (state) => {
                state.cast.status = "Loading movie cast...";
            })
            .addCase(fetchMovieCast.fulfilled, (state, action) => {
                state.cast.data = action.payload;
                state.cast.status = "Movie cast loaded successfully";
            })
            .addCase(fetchMovieCast.rejected, (state, action) => {
                state.cast.status = "Failed to load movie cast";
                state.cast.error = action.payload;
            });
    },
});

export default movieSlice.reducer;
