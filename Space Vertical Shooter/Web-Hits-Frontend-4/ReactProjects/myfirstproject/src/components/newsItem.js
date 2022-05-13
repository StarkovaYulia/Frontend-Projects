import { Card, Button } from 'react-bootstrap';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NewsItem(props){
    function getFormattedDate(datetime) {
        var date = new Date(datetime);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return day + '.' + month + '.' + year;
    }
    const datatime = getFormattedDate(props.date);
    return (
        <Card className="mb-2">
            <Card.Header className="card-header">
                <span className="boldString makeMargin">{props.title}</span>
                <span className="makeMargin"> {props.tags} </span>
            </Card.Header>
            <Card.Body>
                <em>{props.content}</em>
            </Card.Body>
            <Card.Footer className="card-header">
                <div>
                    <p className="deleteMargin makeInline makeMargin"><span className="boldString">Date:</span> {datatime}</p>  
                </div>
                <div className="form-group col-md-2 makeWidth">
                    {props.likes}
                    <button type="button" className="btn btn-default">
                        <FontAwesomeIcon className="colorOfHeart" icon={faHeart} />
                    </button>
                </div>
            </Card.Footer >
        </Card>
    );
}

export default NewsItem;