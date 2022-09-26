import "./usersidebar.css"
import { MdHome } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { MdLaptop } from "react-icons/md";
import { MdLightbulb } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import { MdLaptopWindows } from "react-icons/md";
import { Link } from "react-router-dom";
import Joke from "awesome-dev-jokes";
import Swal from "sweetalert2";

const UserSidebar = () => {
    
    const getJoke = () => {
        Swal.fire({
            title: Joke.getRandomJoke(),
            timer: 7000,
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MdHome className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Link to="/messenger">
                            <MdMessage className="sidebarIcon" />
                            <span className="sidebarListItemText">Dopisivanje</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <a href="https://www.mojposao.ba/#!home" target="_blank">
                            <MdLaptop className="sidebarIcon" />
                            <span className="sidebarListItemText">Poslovi i oglasi</span>
                        </a>
                    </li>
                    <li onClick={getJoke} className="sidebarListItem">
                        <MdLightbulb className="sidebarIcon" />
                        <span className="sidebarListItemText">Nasmij se..</span>
                    </li>
                    <li className="sidebarListItem">
                        <MdContactSupport className="sidebarIcon" />
                        <Link to="/contact"><span className="sidebarListItemText">Kontakt</span></Link>
                    </li>
                </ul>
                <hr className="sidebarHr"></hr>
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <a href="https://www.infobip.com/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Infobip</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://www.atlantbh.com/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Atlantbh</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://www.ministryofprogramming.com/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Ministry of programming</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://symphony.is/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Symphony</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://authoritypartners.com/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Authority Partners</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://www.comtrade.com/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Comtrade</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://www.endava.com/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Endava</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://infostudio.ba/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Info Studio</span>
                        </a>
                    </li>

                    <li className="sidebarFriend">
                        <a href="https://www.logosoft.ba/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Logosoft</span>
                        </a>
                    </li>
                    <li className="sidebarFriend">
                        <a href="https://www.mistral.ba/" target="_blank">
                            <MdLaptopWindows className="sidebarFriendImage" />
                            <span className="sidebarFriendName">Mistral</span>
                       </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}




export default UserSidebar;