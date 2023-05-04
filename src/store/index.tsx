import { AnyAction, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { type } from "os";
import { stringify } from "querystring";

interface WishList {
  movies_ids: string[];
}

var favoritesMoviesStorage;

if (typeof window !== "undefined") {
  favoritesMoviesStorage = localStorage.getItem("favoritesMovies");
}

const favoritesMoviesStorageArr = favoritesMoviesStorage
  ? JSON.parse(favoritesMoviesStorage)
  : [];

const initialWishList: WishList = {
  movies_ids: favoritesMoviesStorageArr,
};

export const addId = (id: string) => ({
  type: "ADD_ID",
  payload: {
    id,
  },
});

export const removeId = (id: string) => ({
  type: "REMOVE_ID",
  payload: {
    id,
  },
});

const reducerWishList = (
  state = initialWishList,
  action: AnyAction
): WishList => {
  switch (action.type) {
    case "ADD_ID":
      let newIds = [...state.movies_ids, action.payload.id];
      localStorage.setItem("favoritesMovies", JSON.stringify(newIds));
      return {
        ...state,
        movies_ids: [...state.movies_ids, action.payload.id],
      };
    case "REMOVE_ID":
      let removeIds = state.movies_ids.filter((id) => id !== action.payload.id);
      localStorage.setItem("favoritesMovies", JSON.stringify(removeIds));
      return {
        ...state,
        movies_ids: state.movies_ids.filter((id) => id !== action.payload.id),
      };
    default:
      return state;
  }
};

interface Reviews {
  items: {
    movie_id: string;
    review: string;
  }[];
}

var reviewsStorage;

if (typeof window !== "undefined") {
  reviewsStorage = localStorage.getItem("reviews");
}
const reviewsStorageArray = reviewsStorage ? JSON.parse(reviewsStorage) : [];

const initialReviews: Reviews = {
  items: reviewsStorageArray,
};

interface ReviewItem {
  movie_id: string;
  review: string;
}

export const addItem = (item: ReviewItem) => ({
  type: "ADD_ITEM",
  payload: {
    item: item,
  },
});

export const removeItem = (id: string) => ({
  type: "REMOVE_ITEM",
  payload: {
    id,
  },
});

const reducerReviews = (state = initialReviews, action: AnyAction): Reviews => {
  switch (action.type) {
    case "ADD_ITEM":
      let newReviews = [...state.items, action.payload.item];
      localStorage.setItem("reviews", JSON.stringify(newReviews));
      return {
        ...state,
        items: [...state.items, action.payload.item],
      };
    case "REMOVE_ITEM":
      let removeReviews = state.items.filter(
        (item) => item.movie_id !== action.payload.id
      );
      localStorage.setItem("reviews", JSON.stringify(removeReviews));
      return {
        ...state,
        items: state.items.filter(
          (item) => item.movie_id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export interface RootState {
  WishList: WishList;
  Reviews: Reviews;
}

const rootReducer = combineReducers<RootState>({
  WishList: reducerWishList,
  Reviews: reducerReviews,
});

export const store = configureStore({
  reducer: rootReducer,
});
