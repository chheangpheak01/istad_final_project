import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, API_KEY, SESSION_ID } from "../../services/api";

// Fetch Popular Movies
export const fetchPopularMovies = createAsyncThunk("movies/fetchPopular", async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Fetch Now Playing Movies
export const fetchNowPlayingMovies = createAsyncThunk("movies/fetchNowPlaying", async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Fetch Upcoming Movies
export const fetchUpcomingMovies = createAsyncThunk("movies/fetchUpcoming", async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Fetch Top Rated Movies
export const fetchTopRatedMovies = createAsyncThunk("movies/fetchTopRated", async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return Promise.reject(error);
    }
});

// loadMoreMovies
export const loadMoreMovies = createAsyncThunk("movies/loadMore", async (page = 1, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch Movie Detail by ID
export const fetchMovieDetail = createAsyncThunk("movies/fetchMovieDetail", async (movieId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

// Fetch Movie Trailer by ID
export const fetchMovieTrailer = createAsyncThunk("movies/fetchMovieTrailer", async (movieId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

// Fetch Movie Cast by ID
export const fetchMovieCast = createAsyncThunk("movies/fetchMovieCast", async (movieId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        return data.cast;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

// Search movies by title
export const searchMovies = createAsyncThunk("/movies/searchMovies", async (title, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(title)}&page=1&include_adult=false`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);

// Create a list 
export const createList = createAsyncThunk("movies/createList", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/list`, {
            name: "My Favorite Movies",
            description: "A list of my top movies",
            language: "en"
        }, {
            params: { api_key: API_KEY, session_id: SESSION_ID },
            headers: { "Content-Type": "application/json" }
        });

        const data = response.data;

        if (data.status_code === 1) {
            return data.list_id;
        } else {
            return rejectWithValue(data.status_message);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.status_message || error.message);
    }
});

// Fetch Movies in a List
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (listId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/list/${listId}`, {
            params: { api_key: API_KEY, language: "en-US" }
        });

        const data = response.data;

        if (data.items) {
            return data.items;
        } else {
            return rejectWithValue("Failed to fetch movies");
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.status_message || error.message);
    }
});

// Delete a Movie from the List
export const deleteMovie = createAsyncThunk("movies/deleteMovie", async ({ movieId, listId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/list/${listId}/remove_item`,
            { media_id: movieId },
            { params: { api_key: API_KEY, session_id: SESSION_ID }, headers: { "Content-Type": "application/json" } }
        );

        const data = response.data;

        if (data.success) {
            return movieId; // Return the deleted movie ID
        } else {
            return rejectWithValue(data.status_message);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.status_message || error.message);
    }
});

