import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";


const Header = () => {
  
  const { user } = useContext(AuthContext);
  
  const handleQuery = (query) => {
    window.location.href = '/search/' + query;    
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
              <img className="logoNavbar" src="/assets/images/profileImages/devnetlogo.png" alt="logo"/>
              <h2 className="navbar-brand">DevNet</h2>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                  { user &&
                  <div className="input-group search-bar me-4">
                        <input style={{ width: "180px", height: "30px"}} className="searchQuery" type="text" name="q" id="q" placeholder="Search"/>
                        <button className="searchButton btn btn-dark btn-sm ms-2 mb-2" onClick={() => handleQuery(document.getElementById("q").value)} type="submit">Pretraži</button>
                  </div>
                  }
                    { user && 
                    <Link className="nav-link mt-3" aria-current="page" to="/messenger">Dopisivanje</Link>
                    }
                    {
                      !user &&
                      <Link className="nav-link mt-3" arica-current="page" to="/user-register">Registracija</Link>
                    }
                    {
                      user &&
                      <Link className="nav-link mt-3" arica-current="page" to="/user-feed">Feed</Link>
                    }
                    {
                      !user &&
                      <Link className="nav-link mt-3" arica-current="page" to="/user-login">Login</Link>
                    }
                    {
                      user &&
                      <Link className="nav-link mt-3" arica-current="page" to="/user-logout">Logout</Link>
                    }
                    <li className="nav-item dropdown">
                        { 
                        <a className="nav-link dropdown-toggle mt-3" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Više</a>
                        }
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            
                            <>
                              { user &&  
                                  <li><Link className="dropdown-item" to="/change-password">Promjena šifre</Link></li>
                              }
                              { user &&
                                  <li><Link className="dropdown-item" to="/edit-profile">Uredi profil</Link></li>   
                              }
                              <li><Link className="dropdown-item" to="/about">O nama</Link></li>
                              <li><Link className="dropdown-item" to="/contact">Kontakt</Link></li>
                            </>
                            
                        </ul>
                    </li>
                    {
                      user &&
                      <Link to={`/user-profile/${user._id}`}>
                        <img crossOrigin="anonymous" src={user.profile_picture === "" ? "http://localhost:5000/static/userProfileFallback.png" : "http://localhost:5000/static/" + user.profile_picture} alt="a" className="topbarImg" />
                      </Link>
                    }
                </div>
              </div>
          </div>
      </nav>
  );
};


export default Header;