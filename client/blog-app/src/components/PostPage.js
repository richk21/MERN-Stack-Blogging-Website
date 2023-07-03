import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {format} from "date-fns";
import "./css/postPage.css";

export default function PostPage(){

    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(()=>{
        console.log(id);
        
        fetch(`http://localhost:4000/post/${id}`)
            .then(response=>{
                response.json().then(postInfo=>{
                    setPostInfo(postInfo);
                })
            })
    },[])

    if(!postInfo) return '';
    return (
        <div className="postPage">
          <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            <h1 className="postTitle">{postInfo.title}</h1>
          </div>
          <h4 style={{padding:'0px 20px'}}>
            <span style={{ fontWeight:'600'}}>by {postInfo.author.username}</span>
            <span style={{color:"#777", marginBottom:'50px', fontWeight:'100'}}>on {format(new Date(postInfo.createdAt), 'MMM d, yyyy')}</span>
          </h4>
          {console.log(postInfo)}
          <div className="postContent" dangerouslySetInnerHTML={{ __html: postInfo.content }} />


          <Link style={{textDecoration:'none', display:'flex',justifyContent:'flex-end'}} to="/"><button className='postbtn'>Back</button></Link>
        </div>
      );
      
}