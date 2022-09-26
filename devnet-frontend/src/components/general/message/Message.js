import "./message.css"
import {format} from "timeago.js";

const Message = ({message, myMessage}) => {
    return (
        <div className={myMessage ? "message myMessage" : "message"}>
            <div className="messageTop">
                <img crossOrigin="anonymous" className="messageImage" src={"http://localhost:5000/static/userProfileFallback.png"} alt="" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>        

    )
}

export default Message;