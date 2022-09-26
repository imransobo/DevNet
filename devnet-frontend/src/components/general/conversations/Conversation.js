import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css"

const Conversation = ({conversation, currentUser}) => {

    const [userConv, setUserConv] = useState([]);

    useEffect(() => {   
        const friendId = conversation.members.find((m) => m !== currentUser._id)
        const getFriendData = async () => {
            try {
                axios.get("http://localhost:5000/api/users/details/" + friendId).then((response) => {
                console.log(response.data);
                console.log(response.status);
                if(response.status === 200) {
                    setUserConv(response.data);
                }
                if(response.status === 404) {
                    alert("Korisnik ne postoji!")
                }    
            
            })    
            } catch (error) {
               console.log(error); 
            }
            
        }

        getFriendData();
    }, [currentUser, conversation])
    
    return (
        <div className="conversation">
            <img crossOrigin="anonymous" className="conversationImage" src={ userConv.profile_picture ? "/assets/images/profileImages/noPicture.png" : "http://localhost:5000/static/" + userConv.profile_picture} alt="" />
            <span className="conversationText">{userConv.first_name + " " + userConv.last_name}</span>
        </div>

    )
}


export default Conversation;