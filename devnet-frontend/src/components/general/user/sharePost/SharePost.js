import axios from "axios";
import { useContext, useRef } from "react";
import { MdCancel, MdPersonOutline } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdTag } from "react-icons/md";
import { AuthContext } from "../../../../context/AuthContext";
import "./sharepost.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SharePost = () => {

    const BASE_URL = "http://localhost:5000/api";
    const { user } = useContext(AuthContext);

    const [postData, setPostData] = useState({
        user_id: user._id,
        post_text: '',
        post_image: '',
    })

    const handleImageChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }
    
    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name] : event.target.value
            
        })
        console.log([event.target.name] + " " + event.target.value);
    }

    const config = {
        headers: {
            "content-type": "multipart/form-data",
        }
    }

    const submitPost = () => {
        const formData = new FormData();
        formData.append("userId", postData.user_id);
        formData.append("post_text", postData.post_text);
        formData.append("post_image", postData.post_image ,postData.post_image.name);
        
        
        try {
            axios.post(BASE_URL + "/posts/create", formData, config).then((response) => {
                console.log(response.data.message);
                if(response.status === 201) {
                    Swal.fire({
                        title: 'Uspješno objavljeno',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position: 'top-end',
                        color: 'blue',
                        iconColor: 'blue',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        
                    })
                    setTimeout(() => {
                        window.location.href = "/user-feed";
                    }, 3000)
                }
                else {
                    Swal.fire({
                        title: 'Došlo je do greške!',
                        icon: 'error',
                        toast: true,
                        timer: 3000,
                        position: 'top-end',
                        color: 'red',
                        iconColor: 'red',
                        timerProgressBar: true,
                        showConfirmButton: false,
                        
                    })
                    setTimeout(() => {
                        window.location.href = "/user-feed";
                    }, 3000)
                }
            })
            
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <MdPersonOutline className="shareProfileImg" />
                    <input type="text" onChange={handleChange} name="post_text" className="shareInput" placeholder="Napiši objavu..."/>
                </div>
                <hr className="shareHr"></hr>
                { postData.post_image && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(postData.post_image)} /> 
                        <MdCancel className="shareCancelImg" onClick={() => setPostData(prevState => ({
                            ...prevState, post_image: "", post_text: ""
                        })) } />
                    </div>
                )

                }
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <input type="file" onChange={handleImageChange} name="post_image" accept="image/*" className="shareIcon" />
                            <span className="shareOptionText">Slika</span>
                        </div>
                        <div className="shareOption">
                            <MdLocationOn color="green" className="shareIcon" />
                            <span className="shareOptionText">Lokacija</span>
                        </div>
                        <div className="shareOption">
                            <MdTag className="shareIcon" />
                            <span className="shareOptionText">Označi prijatelja</span>
                        </div>
                    </div>
                    <button onClick={submitPost} className="shareButton">Objavi</button>
                </div>
            </div>
        </div>
    )
}


export default SharePost;