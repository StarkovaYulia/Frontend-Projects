import {createStore, combineReducers, applyMiddleware } from 'redux';
import newsReducer from '../reducers/news-reducer';
import thunk from 'redux-thunk';

let storeSecondary = {
    gamersSection: {
        gamers: [
            {id : 1, gamerName: "Anna", gameScoring: 0},
            {id : 2, gamerName: "A", gameScoring: 0},
            {id : 3, gamerName: "b", gameScoring: 0},
            {id : 4, gamerName: "c", gameScoring: 0},
            {id : 5, gamerName: "d", gameScoring: 0},
            {id : 6, gamerName: "e", gameScoring: 0},
            {id : 7, gamerName: "f", gameScoring: 0}
        ]
    }
}



let reducers = combineReducers({
    newsPage : newsReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
export default store;


