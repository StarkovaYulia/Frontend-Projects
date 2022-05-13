import React from 'react';
import NewsItem from './newsItem';
import { Card } from 'react-bootstrap'

class News extends React.Component{
    render(){
        return(
            <div>
                <h3 className="mb-3 mt-3">Новости</h3>
                <Card>
                    <Card.Body className="NewsTitleCard">
                        <Card.Text>В данном разделе новости подгружаются с сервера</Card.Text>
                    </Card.Body>
                </Card>
                <div className='mt-3 card-deck'>
                    {
                        this.props.newsPage.news.map((value) => {
                            return <NewsItem title={value.title} content={value.content} date={value.date} tags={value.tags} likes={value.serviceInfo.likes} key = {value.id}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default News;