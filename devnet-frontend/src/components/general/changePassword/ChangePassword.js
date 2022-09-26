import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const ChangePassword = () => {

    const {user} = useContext(AuthContext);
    const [oldPassShown, setOldPassShown] = useState(false);
    const [newPassShown, setNewPassShown] = useState(false);

    const toggleOld = () => {
        setOldPassShown(!oldPassShown);
    }

    const toggleNew = () => {
        setNewPassShown(!newPassShown);
    }

    const [userData, setUserData] = useState({
        oldPassword: '',
        newPassword: '',
        newPassword1: ''
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
            
        })
        console.log([event.target.name] + " " + event.target.value);
    }

    const newPassMatch = () => {
        return userData.newPassword === userData.newPassword1;
    }

    const changePass = () => {
        const formData = new FormData();
        formData.append("oldPassword", userData.oldPassword);
        formData.append("newPassword", userData.newPassword);
        formData.append("userId", user._id);

        if(newPassMatch() && userData.newPassword.length > 6) {
            axios.put("http://localhost:5000/api/users/change-password", formData).then((response) => {
                if(response.status === 200) {
                    Swal.fire({
                        title: 'Uspješno ste promijenili šifru',
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
                if(response.status === 201) {
                    Swal.fire({
                        title: 'Stara šifra se ne podudara!',
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
                        window.location.href = "/change-password";
                    }, 3000)
                }
            })
        }
        else {
            Swal.fire({
                title: 'Nove šifre se ne podudaraju / Prekratka šifra',
                icon: 'error',
                toast: true,
                timer: 3000,
                position: 'top-end',
                color: 'red',
                iconColor: 'red',
                timerProgressBar: true,
                showConfirmButton: false,
                
            })  
        }

        
    }

    useEffect(() => {
        document.title = "Promjena šifre";
    })

    return (
        <div className='container mt-4 login'>
                <div className='row'>
                    <div className='col-6 offset-3'>
                        <div className='card'>
                            <h4 className="mt-4 ms-3">Promijeni šifru</h4>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label className="form-label h6">Stara šifra</label>
                                    <input type={oldPassShown ? "text" : "password"} required onChange={handleChange} className="form-control regPolja" name="oldPassword" />
                                    <input type="checkbox" value="Prikaži password" onChange={toggleOld} />
                                    <label className="ms-2">Prikaži šifru</label>
                                </div>
                                <hr></hr>
                                <div className="mb-3">
                                    <label className="form-label h6">Nova šifra</label>
                                    <input type={newPassShown ? "text" : "password"} required minLength="8" onChange={handleChange} className="form-control regPolja" name="newPassword" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Ponovi novu šifru</label>
                                    <input type={newPassShown ? "text" : "password"} required minLength="8" onChange={handleChange} className="form-control regPolja" name="newPassword1" />
                                    <input type="checkbox" value="Prikaži novu šifru" onChange={toggleNew} />
                                    <label className="ms-2">Prikaži novu šifru</label>
                                </div>
                                <button type="submit" onClick={changePass} className="btn btn-dark">Promijeni šifru</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ChangePassword;