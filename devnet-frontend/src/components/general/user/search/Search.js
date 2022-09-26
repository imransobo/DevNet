import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Search = () => {

    const [searchData, setSearchData] = useState([]);
    const {query} = useParams();
    
    useEffect(() => {
        document.title = "Pretraga: " + query;
        try {
            axios.get("http://localhost:5000/api/users/search/" + query).then((response) => {
                setSearchData(response.data);
            })
        } catch (error) {  
            console.log(error)
        }
    }, [])
    return (
        <div className='container mt-3 animate__animated pulse'>
            <h3 className="pb-1 mb-4">Rezultati pretrage za: {query}</h3>
            <div className="row mb-4">
                { searchData.length > 0 && searchData.map((user, index) => 
                <div className="col-md-3 mb-4">
                    <div className="card">
                    <Link to={"/user-profile/" + user._id}><img crossOrigin="anonymous" src={user ? "http://localhost:5000/static/" + user.profile_picture : "http://localhost:5000/static/userProfileFallback.png"} className="card-img-top" height={300} alt={"Slika"} /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={"/user-profile/" + user._id}>{user.first_name + " " + user.last_name }</Link></h5>
                        </div>
                    </div>
                </div>
                )}
            </div>

            { searchData.length === 0 && 
            <div className="row errMsg col-sm-12">
                <h3 className="col-sm-12">Ne postoje rezultati sa traženim upitom!</h3>
            </div>
            }
        </div>
    )
}

export default Search;