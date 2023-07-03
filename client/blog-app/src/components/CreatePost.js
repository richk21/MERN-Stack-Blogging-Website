import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './css/createPost.css';
import { Link, Navigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'); // Replace 'default-image-url' with the URL of your default image

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = {
    formats: [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
      'font',
    ]
  };

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files ? files[0] : ''); // Set the selected file or an empty string if no file is selected

    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: "POST",
      body: data,
      credentials: 'include',
    });
    
    console.log(await response.json());
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  const handleFileChange = (ev) => {
    setFiles(ev.target.files);
    if (ev.target.files && ev.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target.result;
        document.getElementById('file-input-container').style.backgroundImage = `url(${fileUrl})`;
      };
      reader.readAsDataURL(ev.target.files[0]);
    } else {
      document.getElementById('file-input-container').style.backgroundImage = `url(${coverImage})`;
    }
  };

  return (
    <form onSubmit={createNewPost}>
      <div id="file-input-container" className={`file-input-container ${files ? 'with-image' : ''}`}>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          style={{
            padding: '20px',
            borderRadius: "20px",
            backgroundColor: 'black',
            fontFamily: 'Poppins, sans-serif',
            color: 'white',
            paddingLeft: '20px'
          }}
        />
        <span className="file-input-text">Cover Image</span>
      </div>
      <input
        type="title"
        placeholder="Title here..."
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className='custom-input'
        style={{ fontWeight: "600", fontSize: '2rem', marginBottom: "50px" }}
        maxLength={100}
      />
      <input
        type="summary"
        placeholder="A short summary..."
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        className='custom-input'
        style={{ fontWeight: "200", fontSize: '1rem', marginBottom: '20px' }}
        maxLength={250}
      />

      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={ev => setContent(ev)}
        className="custom-react-quill"
      />

      <div style={{display:'flex', gap:'10px',justifyContent:'flex-end'}}>
      <Link style={{textDecoration:'none'}} to="/"><button className='postbtn'>Back</button></Link>
      <button className='postbtn'>Post</button>
      </div>      

    </form>
  );
}
