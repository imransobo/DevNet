import ChatOnline from "../chatOnline/ChatOnline";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import "./messenger.css";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client";

const Messenger = () => {
    const { user } = useContext(AuthContext);

    const [conversations, setConversations] = useState([]);
    const [currChat, setCurrChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        document.title = "Dopisivanje";
        
        socket.current = io("ws://localhost:8900");

        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(user.followings.filter(f => users.some(u => u.userId === f)));
        })
    }, [user])

    useEffect(() => {
        const getConversations = async () => {
            try {
                axios.get("http://localhost:5000/api/conversation/" + user._id).then((response) => {
                    setConversations(response.data);
                    console.log(response.data); 
                })    
            } catch (error) {
                console.log(error);
            }
        }

        getConversations();
    }, [user._id])


    useEffect(() => {

        const getMessages = async () => {
            console.log("chat" + currChat);
            try {
                await axios.get("http://localhost:5000/api/message/" + currChat?._id).then((response) => {
                console.log("poruke" + response.data)
                setMessages(response.data);
            })    
            } catch (error) {
              console.log(error);  
            }
        
        }
        getMessages();
    }, [currChat])


    const config = {
        headers: {
            "content-type": "multipart/form-data",
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("sender", user._id);
        formData.append("text", newMessage);
        formData.append("conversationId", currChat._id);
        
        const receiverId = currChat.members.find(memb => memb !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage 
        })

        try {
            axios.post("http://localhost:5000/api/message/send", formData, config).then((response) => {
                console.log("res data   " + response.status);
                console.log("res data " + JSON.stringify(response.data))
                setMessages([...messages, response.data])
                setNewMessage("")
            })
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Pretraži prijatelje" className="chatMenuInput" />
                        { conversations.map((conv, key) => (
                            <div onClick={() => setCurrChat(conv)}>
                                <Conversation key={key} conversation={conv} currentUser={user} />        
                            </div>
                        ))}
                    </div>         
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        { currChat ?
                        <> 
                            <div className="chatBoxTop">
                                { messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} myMessage={m.sender === user._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea 
                                    onChange={(e) => setNewMessage(e.target.value)} 
                                    name="text" 
                                    className="chatMessageInput"
                                    value={newMessage} 
                                    placeholder="Napišite poruku..." />
                                <button onClick={sendMessage} className="chatSubmitButton">Pošalji</button>
                            </div>
                        </> : 
                        (<span className="noConversationText">Odaberite razgovor i započnite konverzaciju...</span>)}
                    </div>  
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrChat={setCurrChat}/>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Messenger;