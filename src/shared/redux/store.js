import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './reducers/userSlice';
import categorySlice from './reducers/categorySlice';
import workoutSlice from './reducers/workoutSlice';
import IsightCategorySlice from './reducers/insightCategorySlice';

const rootReducer = combineReducers({
  user: userSlice,
  categories: categorySlice,
  workouts: workoutSlice,
  insightCategories: IsightCategorySlice,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'categories', 'insightCategories'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['register'],
        ignoredActionPaths: ['rehydrate', 'register'],
        ignoredPaths: ['register'],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
