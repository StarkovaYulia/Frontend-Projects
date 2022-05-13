import { newsApi } from "../Api/newsApi";

const LOAD_NEWS = "LOAD_NEWS";
const SET_EDIT_NEWS = "SET_EDIT_NEWS";

let initialState = {
    news: [],
    editNews: {
        title: "",
        content: "",
        date: "",
        tags: ""
    }
}

const newsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOAD_NEWS:
            newState.news = action.news;
            return newState;
        case SET_EDIT_NEWS:
            newState.news = [...state.news];
            newState.editNews = {title : action.title, content : action.content, date : action.date, tags : action.tags};
            return newState;
        default:
            return newState;
    }
}

export function loadNewsActionCreator(news){
    return {type: LOAD_NEWS, news : news}
}

export function loadNewsThunkCreator(){
    return (dispatch) => {
        newsApi.getNews().then(data => {
            dispatch(loadNewsActionCreator(data));
        })
    }
}

export function setEditNewsActionCreator(title, content, date, tags){
    return {type: LOAD_NEWS, title : title, content : content, date : date, tags : tags};
}

export default newsReducer;