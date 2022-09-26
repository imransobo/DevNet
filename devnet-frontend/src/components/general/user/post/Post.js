import { useContext, useEffect, useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { MdMoreVert } from "react-icons/md";
import { MdThumbUpOffAlt } from "react-icons/md";
import { Users } from "../dummyData";
import axios from "axios";
import { format } from 'timeago.js';
import "./post.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

const BASE_URL = "http://localhost:5000/api";
const Post = ({post}) => {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    
    const { user } = useContext(AuthContext);

    const [postUser, setPostUser] = useState({});

    const likeHandler = () => {
        const formData = new FormData();
        console.log(user._id);
        formData.append("userId", user._id);

        try {
            axios.put("http://localhost:5000/api/posts/like/" + post._id + "/" + user._id, formData).then((response) => {
                console.log(response.status);
            });   
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ?  like - 1 : like + 1)
        setIsLiked(!isLiked);
    }

    const fetchPostUser = async () => {
        axios.get("http://localhost:5000/api/users/details/" + post.userId).then((response) => {
            console.log(response.data);
            setPostUser(response.data);
        }) 
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id))
    }, [user._id, post.likes])

    useEffect(() => {
        document.title = "Feed";
        setIsLiked(post.likes.includes(user._id));
        
        fetchPostUser();

    }, [user._id, post.likes]);
    
    return (
        <>
        <div className="post"> 
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft"> 
                        <img crossOrigin="anonymous" className="postProfileImg" src={ user.profile_picture ? "http://localhost:5000/static/" + user.profile_picture : "/assets/images/profileImages/noPicture.png"} />
                        <Link to={`/user-profile/${post.userId}`}>
                            <span className="postUsername">{postUser.first_name + " " + postUser.last_name }</span>
                        </Link>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MdMoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.text}</span>
                    <img crossOrigin="anonymous" className="postImage" height={500} width={900} src={"http://localhost:5000/static/" + post.image } alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <MdThumbUpOffAlt onClick={likeHandler} className="likeButton" />
                        <span className="likeCounter">{like} ljudi</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"> komentara</span>
                    </div>
                </div>
            </div>
            
        </div>
            
        </>
    )
}


export default Post;