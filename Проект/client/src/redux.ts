import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import rootSaga from "./sagas";
import {BlogReducer} from "./reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(BlogReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);