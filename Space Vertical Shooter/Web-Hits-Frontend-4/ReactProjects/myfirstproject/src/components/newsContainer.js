import { connect } from "react-redux";
import React from "react";
import News from './news';
import { loadNewsThunkCreator } from '../reducers/news-reducer';
import NewsCarousel from "./carousel";


class MiddleNewsComponent extends React.Component{
    componentDidMount(){
        this.props.loadNewsThunkCreator(); 
    }
    render(){
        return (
            <div>
                <NewsCarousel/>
                <News {...this.props}/>
            </div>  
        );
    }
}

function mapStateToProps(state){
    return {newsPage : state.newsPage};
}

const NewsContainer = connect(mapStateToProps, { loadNewsThunkCreator })(MiddleNewsComponent)
export default NewsContainer;