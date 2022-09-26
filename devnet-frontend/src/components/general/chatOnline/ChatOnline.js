import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css"

const ChatOnline = ({ onlineUsers, currentId, setCurrChat }) => {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);


    useEffect(() => {
        try {
            axios.get("http://localhost:5000/api/users/followings/" + currentId).then((response) => {
                if(response.status === 200) {
                    setFriends(response.data);
                }
        })
        } catch (error) {
            console.log(error);
        }
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))

        console.log(onlineUsers);
        console.log("onl prij" + JSON.stringify(onlineFriends))
    }, [friends, onlineUsers])

    const selectFriend = async (onlineUser) => {
        try {
            axios.get("http://localhost:5000/api/conversation/find/" + currentId + "/" + onlineUser._id).then((response) => {
                setCurrChat(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="chatOnline">
            <p>Online prijatelji</p>
            { onlineFriends.map((online) => (
            <div className="chatOnlineFriend" onClick={() => selectFriend(online) }>
                <div className="chatOnlineImgContainer">
                    <img crossOrigin="anonymous" className="chatOnlineImage" src={online?.profile_picture !== "" ? "http://localhost:5000/static/" + online?.profile_picture : "http://localhost:5000/static/userProfileFallback.png" } alt="sLIKA" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{online.first_name + " " + online.last_name}</span>
            </div>
            ))}
        </div>        

    )
}


export default ChatOnline;