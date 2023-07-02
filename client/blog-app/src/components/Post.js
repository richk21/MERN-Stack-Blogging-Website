export default function Post(){
    return(
        <div className="post">
            <div className="image">
            <img src='https://www.politico.eu/cdn-cgi/image/width=1280,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/06/28/Live-Blog-EUCO-scaled.jpg' alt="blogimage"/>
            </div>
            <div className="postTexts">
            <h3>Sample heading</h3>
            <p className="postsubheader">
              <a className='author'>Richa Kiran</a>
              <time>01-07-2023 09:09</time>
            </p>
            <p className='postPara'>This is a sample text for this post! I hope you enjoy reading this.
            This is a sample text for this post! I hope you enjoy reading this.
            This is a sample text for this post! I hope you enjoy reading this.
            </p>
            </div>
        </div>
    )
}