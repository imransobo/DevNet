import axios from "axios";
import { useEffect, useRef, useState } from "react";
import cities from "../general/jsons/cities.json";
import titles from "../general/jsons/titles.json";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDetectAdBlock } from "adblock-detect-react";

const BASE_URL = "http://localhost:5000/api/auth";

const Register = () => {

    useEffect(() => {
        document.title = "Registracija"
    })

    const [occupation, setOccupation] = useState('Junior Software Engineer');

    const [city, setCity] = useState('Sarajevo');
     
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const [profilePicture, setProfilePicture] = useState('');
    
    const navigate = useNavigate();

    const adBlockDetected = useDetectAdBlock();

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        occupation: occupation,
        city: city,
        profile: '',
        userPassword: ''
    })

    const handleProfileChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }
    
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
            
        })
        console.log([event.target.name] + " " + event.target.value);
    }

    const config = {
        headers: {
            "content-type": "multipart/form-data",
        }
    }
    const submitForm = () => {
        const formData = new FormData();
        formData.append("first_name", userData.first_name);
        formData.append("last_name", userData.last_name);
        formData.append("email", userData.email);
        formData.append("occupation", userData.occupation);
        formData.append("city", userData.city);
        formData.append("birth_date", userData.birth_date);
        formData.append("profile", userData.profile, userData.profile.name);
        formData.append("userPassword", userData.userPassword);
        
        console.log(formData);
        try {
            axios.post(BASE_URL + "/register", formData, config).then((response) => {
                
                if(response.status === 200) {                        
                    Swal.fire({
                        title: 'Korisnik sa emailom već postoji!',
                        icon: 'error',
                        toast: true,
                        timer: 4000,
                        position: 'top-end',
                        color: 'red',
                        iconColor: 'red',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                }
                
                if(response.status === 201) {
                    Swal.fire({
                        title: 'Uspješno ste se registrovali!',
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
                        window.location.href = "/user-login";
                    }, 3000)
                }            
            })
            
        } catch (error) {
            console.log(error);
        }


        
    }

    useEffect(() => {
        if(adBlockDetected) {
            Swal.fire({
                title: 'Molimo Vas da isključite AdBlocker!',
                timerProgressBar: true,
                showConfirmButton: true,
            })
        }
    })



    return (
        <div className='container mt-4 registracija'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card'>
                        <h4 className="mt-4 ms-3">Registracija</h4>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label className="form-label h6">Ime</label>
                                    <input type="text" onChange={handleChange} className="form-control regPolja" name="first_name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Prezime</label>
                                    <input type="text" onChange={handleChange} className="form-control regPolja" name="last_name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Email</label>
                                    <input type="email" onChange={handleChange} className="form-control regPolja" name="email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Datum rođenja</label>
                                    <input type="date" onChange={handleChange} className="form-control regPolja" name="birth_date" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Zanimanje</label>
                                    <select className="form-select" onChange={e => setOccupation(e.target.value)} style={{ textAlign: "center" }} name="occupation" id="titule">
                                        { titles.map((title, key) => 
                                            <option key={key} value={title.title}>{title.title}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                <label className="form-label h6">Grad</label>
                                    <select value={city} onChange={e => setCity(e.target.value)} className="form-select" style={{ textAlign: "center" }} name="cities" id="gradovi">
                                        { cities.map((city, key) => 
                                            <option key={key} value={city.city}>{city.city}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Profilna slika</label>
                                    <input type="file" onChange={handleProfileChange} accept="image/*" id="profile" name="profile" className="form-control regPolja" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label h6">Šifra</label>
                                    <input type="password" onChange={handleChange} className="form-control regPolja" name="userPassword" id="sifra1" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Ponovljena šifra</label>
                                    <input type="password" className="form-control regPolja" id="sifra2" />
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-dark">Registruj se</button>
                            </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default Register;