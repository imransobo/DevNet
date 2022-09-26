import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userLogin } from "../../../apiCalls";
import { AuthContext } from "../../../context/AuthContext";
import { AiOutlineLoading } from "react-icons/ai";
const BASE_URL = "http://localhost:5000";

const Login = () => {

    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    
    useEffect(() => {
        document.title = "Login"
    })
    
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
            
        })
        console.log([event.target.name] + " " + event.target.value);
    }

    const handleLogin = () => {
        userLogin({email: userData.email, password: userData.password}, dispatch);
    }

    return ( 
        <div className='container mt-4 login'>
                <div className='row'>
                    <div className='col-6 offset-3'>
                        <div className='card'>
                            <h4 className="mt-4 ms-3">Login</h4>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label className="form-label h6">Email</label>
                                    <input type="email" required onChange={handleChange} className="form-control regPolja" name="email" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Šifra</label>
                                    <input type="password" required minLength="6" onChange={handleChange} className="form-control regPolja" name="password" id="sifra" />
                                </div>
                                <button type="submit" onClick={handleLogin} className="btn btn-dark">{isFetching ? <AiOutlineLoading/> : "Login"}</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}


export default Login;