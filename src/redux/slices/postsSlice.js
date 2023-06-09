import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});
export const fetchPostsByPopularity = createAsyncThunk(
  '/posts/fetchPostsByPopularity',
  async () => {
    const { data } = await axios.get('/posts/popular');
    return data;
  },
);
export const fetchTags = createAsyncThunk('/tags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});
export const deletePost = createAsyncThunk('/deletePost', async (id) => {
  axios.delete(`/posts/${id}`);
});
const initialState = {
  posts: {
    items: [],
    status: '',
  },
  tags: {
    items: [],
    status: '',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
    [deletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((elem) => elem._id != action.meta.arg);
    },
    [fetchPostsByPopularity.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByPopularity.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loading';
    },
  },
});

export const postReducer = postsSlice.reducer;
