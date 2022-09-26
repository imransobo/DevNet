import { useContext, useEffect, useReducer, useState } from "react";
import Post from "../post/Post";
import SharePost from "../sharePost/SharePost";
import "./userfeed.css";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import Swal from "sweetalert2";

const UserFeed = ({userId}) => {

    const [posts, setPosts] = useState([]);

    const { user } = useContext(AuthContext);

    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        document.title = "Feed";

        
        if(userId) {
            axios.get("http://localhost:5000/api/posts/profile/" + userId).then((response) => {
                setPosts(response.data);
            })
        }else {
            axios.get("http://localhost:5000/api/posts/feed/" + user._id).then((response) => {
                setPosts(response.data.message);
                console.log(response.data.message);
                setIsBirthday(response.data.message2);
                console.log("OVDJE")
            })  
        }

        if(isBirthday) {
            Swal.fire({
                title: 'Sretan rođendan želi Vam DevNet team!',
                imageUrl: 'https://img.freepik.com/premium-vector/luxury-happy-birthday-lettering-text-greeting-design_660620-137.jpg?w=2000',
                imageWidth: 400,
                imageHeight: 200,
                timer: 4000,
                imageAlt: 'Custom image',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
        
    }, [user._id, userId, isBirthday]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!userId || userId === user._id) && <SharePost />}
                {posts.map((p, key) => (
                    <Post key={key} post={p} />
                ))}
            </div>

        </div>
    )
}

export default UserFeed;