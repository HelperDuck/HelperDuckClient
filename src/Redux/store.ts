import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/user";
import AllUsersReducer from "./reducers/AllUsers";
import languagesReducer from "./reducers/languages";
import technologiesReducer from "./reducers/technologies";
import helpRequestReducer from "./reducers/helpRequest";
import userByIdReducer from "./reducers/userById";
import reviewReducer from "./reducers/reviews";
import roomIdStateReducer from "./reducers/RoomId";
import myRequestModalStateReducer from './reducers/myRequestModalState'
import helpDetailsReducer from './reducers/helpDetails'
import modalStateReducer from "./reducers/ModalReducer";

export const store = configureStore({
  reducer: {
    user: usersReducer, //user that is logged in
    allUsers: AllUsersReducer, //TODO NOT SURE ABOUT THIS
    languages: languagesReducer,
    technologies: technologiesReducer,
    helpRequests: helpRequestReducer,
    userById: userByIdReducer,
    askerReview: reviewReducer,
    roomIdState: roomIdStateReducer,
    myRequestModalState: myRequestModalStateReducer,
    helpDetails: helpDetailsReducer,
    modalState: modalStateReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
