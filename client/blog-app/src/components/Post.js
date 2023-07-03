import {format} from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id, title, summary, cover, content, createdAt, author}){
    return(
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={"http://localhost:4000/"+cover} style={{borderRadius:'20px'}} alt="cover image"/>
                </Link>
            </div>
            <div className="postTexts">
            <Link to={`/post/${_id}`}>
            <h3>{title}</h3>
            <p className="postsubheader">
              <a className='author'>{author.username}</a>
              <time>{format(new Date(createdAt), 'MMM d, yyyy')}</time>
            </p>
            <p className='postPara'>
                {summary}
            </p>
            </Link>
            </div>
        </div>
    )
}