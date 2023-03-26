import {useState} from 'react';

const Blog = ({blog}) => {
    const [visibility, setVisibility] = useState(false);

    const showDetails = {display: visibility ? 'block': 'none'};

    const toggleDetails = () => {
        setVisibility(!visibility);
    }

    return(
        <div className='blog-item'>
            <div className='blog-item-header'>
                {blog.title} {blog.author} <button className='blog-button' onClick={toggleDetails}>{visibility ? 'hide' : 'show'}</button>
            </div>
            <div className='blog-item-body' style={showDetails}>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button className='blog-button'>like</button></p>
                <p>{blog.user.name}</p>
            </div>
        </div>  
    );

};

export default Blog;