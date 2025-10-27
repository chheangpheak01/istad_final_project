import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, API_KEY } from "../../services/aip";

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

// Fetch All Movies - with multiple pages for more content
export const fetchAllMovies = createAsyncThunk("movies/fetchAllMovies", async () => {
    try {
        // Fetch multiple pages to get more movies
        const page1 = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=1&sort_by=popularity.desc`);
        const page2 = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=2&sort_by=popularity.desc`);
        const page3 = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=3&sort_by=popularity.desc`);
        
        const data1 = await page1.json();
        const data2 = await page2.json();
        const data3 = await page3.json();
        
        // Combine results from all pages
        const allMovies = [
            ...(data1.results || []),
            ...(data2.results || []),
            ...(data3.results || [])
        ];
        
        return allMovies;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Fetch Movie Detail by ID
export const fetchMovieDetail = createAsyncThunk(
    "movies/fetchMovieDetail",
    async (movieId, { rejectWithValue }) => {
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
export const fetchMovieTrailer = createAsyncThunk(
    "movies/fetchMovieTrailer",
    async (movieId, { rejectWithValue }) => {
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
export const fetchMovieCast = createAsyncThunk(
    "movies/fetchMovieCast",
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
            const data = await response.json();
            return data.cast;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
