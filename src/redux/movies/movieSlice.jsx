import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    fetchMovieDetail,
    fetchMovieTrailer,
    fetchMovieCast,
    searchMovies,
    loadMoreMovies,
    createList,
    fetchMovies,
    deleteMovie
} from "./createAction";

const initialState = {
    popular: { movies: [], status: "idle", error: null },
    nowPlaying: { movies: [], status: "idle", error: null },
    upcoming: { movies: [], status: "idle", error: null },
    topRated: { movies: [], status: "idle", error: null },
    movieDetail: { data: null, status: "idle", error: null },
    trailer: { data: [], status: "idle", error: null },
    cast: { data: [], status: "idle", error: null },
    searchResults: { movies: [], status: "idle", error: null },
    loadMore: {
        movies: [],
        status: "idle",
        error: null,
        currentPage: 1,
        totalPages: 0,
        hasMore: true
    },
    myList: { listId: null, status: "idle", error: null },
    moviesInList: { movies: [], status: "idle", error: null },
    deletedMovies: [],
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        removeMovieFromCategory: (state, action) => {
            const { category, movieId } = action.payload;
            if (state[category]?.movies) {
                state[category].movies = state[category].movies.filter(m => m.id !== movieId);
            }
        },
        removeFromSearchResults: (state, action) => {
            const movieId = action.payload;
            state.searchResults.movies = (state.searchResults.movies || []).filter(m => m.id !== movieId);
        },
        addMovieToCategory: (state, action) => {
            const { category, movie } = action.payload;
            if (!state[category]?.movies.some(m => m.id === movie.id)) {
                state[category].movies.push(movie);
            }
        }
    },
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
        builder
            .addCase(loadMoreMovies.pending, (state) => {
                state.loadMore.status = "Load more movies is loading";
            })
            .addCase(loadMoreMovies.fulfilled, (state, action) => {
                state.loadMore.movies = [...state.loadMore.movies, ...action.payload];
                state.loadMore.currentPage += 1;
                state.loadMore.hasMore = action.payload.length > 0;
                state.loadMore.status = "Load more movies loaded successfully";
            })
            .addCase(loadMoreMovies.rejected, (state, action) => {
                state.loadMore.status = "Load more movies is failed";
                state.loadMore.error = action.payload;
            });
        builder
            .addCase(searchMovies.pending, (state) => {
                state.searchResults.status = "loading";
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.searchResults.movies = action.payload;
                state.searchResults.status = "succeeded";
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.searchResults.status = "failed";
                state.searchResults.error = action.payload;
            })
        builder
            .addCase(createList.pending, (state) => {
                state.myList.status = "Creating list...";
            })
            .addCase(createList.fulfilled, (state, action) => {
                state.myList.listId = action.payload;
                state.myList.status = "List created successfully";
            })
            .addCase(createList.rejected, (state, action) => {
                state.myList.status = "Failed to create list";
                state.myList.error = action.payload;
            });
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.moviesInList.status = "Loading movies...";
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.moviesInList.movies = action.payload;
                state.moviesInList.status = "Movies loaded successfully";
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.moviesInList.status = "Failed to load movies";
                state.moviesInList.error = action.payload;
            });
        builder
            .addCase(deleteMovie.pending, (state) => {
                state.moviesInList.status = "Deleting movie...";
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                const deletedMovie = action.payload;
                const deletedMovieId = deletedMovie.id || deletedMovie;
                // List of categories to remove the movie from
                const categories = [
                    "moviesInList",
                    "popular",
                    "nowPlaying",
                    "upcoming",
                    "topRated",
                    "searchResults",
                    "loadMore"
                ];
                // Remove the deleted movie from all categories
                categories.forEach(cat => {
                    if (state[cat]?.movies) {
                        state[cat].movies = state[cat].movies.filter(m => m.id !== deletedMovieId);
                    }
                });
                // Add to deletedMovies only if it doesn't already exist
                if (!state.deletedMovies.some(m => m.id === deletedMovieId)) {
                    state.deletedMovies.push(deletedMovie.id ? deletedMovie : { id: deletedMovieId });
                }
                state.moviesInList.status = "Movie deleted successfully";
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.moviesInList.status = "Failed to delete movie";
                state.moviesInList.error = action.payload;
            });
    },
});

export default movieSlice.reducer;
export const { removeMovieFromCategory, removeFromSearchResults, addMovieToCategory } = movieSlice.actions;