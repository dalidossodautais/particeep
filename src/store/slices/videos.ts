import { Video } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const getCategories = (videos: Video[]) =>
  Object.values(videos).reduce<Video["category"][]>((accu, video) => {
    if (!accu.includes(video.category)) accu.push(video.category);
    return accu;
  }, []);

export type VideosState = {
  categories: Video["category"][];
  data: Record<Video["id"], Video>;
  opinions: Record<Video["id"], "like" | "dislike">;
  ids: Video["id"][];
  shownIds: Video["id"][];
  isLoading: boolean;
  numberByPage: number;
  page: number;
  selectedCategories: Video["category"][];
};

const initialState: VideosState = {
  categories: [],
  data: {},
  opinions: {},
  ids: [],
  shownIds: [],
  isLoading: false,
  numberByPage: 4,
  page: 1,
  selectedCategories: [],
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Video[]>) => {
      state.data = action.payload.reduce<VideosState["data"]>((accu, video) => {
        accu[video.id] = video;
        return accu;
      }, {});
      state.ids = action.payload.map((video) => video.id);
      state.shownIds = [...state.ids];
      state.isLoading = true;
      state.categories = getCategories(action.payload);
    },
    remove: (state, action: PayloadAction<Video["id"]>) => {
      delete state.data[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
      state.shownIds = state.shownIds.filter((id) => id !== action.payload);
      state.categories = getCategories(Object.values(state.data));
    },
    addLike: (state, action: PayloadAction<Video["id"]>) => {
      state.data[action.payload].likes += 1;
      if (state.opinions[action.payload] === "dislike")
        state.data[action.payload].dislikes -= 1;
      state.opinions[action.payload] = "like";
    },
    removeLike: (state, action: PayloadAction<Video["id"]>) => {
      state.data[action.payload].likes -= 1;
      delete state.opinions[action.payload];
    },
    addDislike: (state, action: PayloadAction<Video["id"]>) => {
      state.data[action.payload].dislikes += 1;
      if (state.opinions[action.payload] === "like")
        state.data[action.payload].likes -= 1;
      state.opinions[action.payload] = "dislike";
    },
    removeDislike: (state, action: PayloadAction<Video["id"]>) => {
      state.data[action.payload].dislikes -= 1;
      delete state.opinions[action.payload];
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeNumberByPage: (state, action: PayloadAction<number>) => {
      state.numberByPage = action.payload;
      state.page = 1;
    },
    toggleSelectedCategories: (
      state,
      action: PayloadAction<Video["category"]>
    ) => {
      state.selectedCategories = state.selectedCategories.some(
        (category) => category === action.payload
      )
        ? state.selectedCategories.filter(
            (category) => category !== action.payload
          )
        : [...state.selectedCategories, action.payload];
      state.shownIds = state.ids.filter(
        (videoId) =>
          !state.selectedCategories.length ||
          state.selectedCategories.includes(state.data[videoId].category)
      );
      state.page = 1;
    },
  },
});

export const {
  init,
  remove,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  changePage,
  changeNumberByPage,
  toggleSelectedCategories,
} = videosSlice.actions;

const videosReducer = videosSlice.reducer;

export default videosReducer;
