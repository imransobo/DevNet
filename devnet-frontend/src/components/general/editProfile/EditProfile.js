import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"


const EditProfile = () => {

    const { user } = useContext(AuthContext);

    const prev_img = user.profile_picture;
    
    const [newData, setNewData] = useState({
        city: user.city,
        occupation: user.occupation,
        profile_picture: user.profile_picture
    })

    const config = {
        headers: {
            "content-type": "multipart/form-data",
        }
    }

    const submitData = () => {
        const formData = new FormData();
        formData.append("userId", user._id);
        formData.append("city", newData.city);
        formData.append("occupation", newData.occupation);
        formData.append("profile_picture", newData.profile_picture, newData.profile_picture.name);
        
        axios.put("http://localhost:5000/api/users/update/" + user._id, formData, config).then((response) => {
            if(response.status === 200) {
                user.city = newData.city;
                user.occupation = newData.occupation;
                user.profile_picture = newData.profile_picture.name;
            }
        })
    }

    const handleChange = (event) => {
        setNewData({
            ...newData,
            [event.target.name] : event.target.value
            
        })
    }

    const handleFile = (event) => {
        setNewData({
            ...newData,
            [event.target.name]: event.target.files[0]
        })
    }

    useEffect(() => {
        document.title = "Uredi profil";
    })

    return (
        <div className='container mt-4 login'>
                { user ? 
                <div className='row'>
                    <div className='col-6 offset-3'>
                        <div className='card'>
                            <h4 className="mt-4 ms-3">Uredi profil</h4>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label className="form-label h6">Mjesto stanovanja</label>
                                    <input type={"text"} onChange={handleChange} className="form-control" name="city" placeholder={user.city}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Promijeni poziciju</label>
                                    <input type={"text"} onChange={handleChange} className="form-control" name="occupation" placeholder={user.occupation}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Promijeni profilnu sliku</label>
                                    <input onChange={handleFile} type="file" className="form-control" name="profile_picture"/>
                                    {prev_img !== "" && <p className="mt-4"><img crossOrigin="anonymous" src={"http://localhost:5000/static/" + prev_img } width="250" /></p>}
                                </div>
                                <button type="submit" onClick={submitData} className="btn btn-dark">Spremi podatke</button>
                            </div>
                        </div>
                    </div>
                </div>  
            : <p>Nemate dozvolu da vidite ovu stranicu</p>}
        </div>
    
        
    )
}

export default EditProfile;