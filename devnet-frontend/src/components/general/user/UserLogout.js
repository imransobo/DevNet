import { useEffect } from "react";

const UserLogout = () => {

    useEffect(() => {
        localStorage.removeItem("user");
        window.location.href = "/user-login";
    })
    
    return (
        <div></div>
    )
}

export default UserLogout;