import { useEffect, useState } from "react";
import Post from "./Post";
import './css/indexpage.css';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  // Filter the posts based on the search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="indexPage">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{fontSize:'1rem', fontFamily:'Poppins, sans-serif', borderRadius:'20px', padding:'15px 20px'}}
        />
      </div>

      <div className="postContainer">
        {filteredPosts.length > 0 &&
          filteredPosts.map(post => <Post key={post._id} {...post} />)}
      </div>
    </div>
  );
}
