import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL, SESSION_ID } from "../../services/api";

export const fetchAccountId = createAsyncThunk("account/fetchAccountId",async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/account?api_key=${API_KEY}&session_id=${SESSION_ID}`);
      return response.data.id; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
