import { Carousel } from 'react-bootstrap';
import React from 'react';



class NewsCarousel extends React.Component{
    render(){
        return(
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100"
                    src = "img/first.png"
                    alt = "firstSlide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100"
                    src = "img/2.png"
                    alt = "secondSlide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100"
                    src = "img/3.png"
                    alt = "thirdSlide"
                    />
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default NewsCarousel;