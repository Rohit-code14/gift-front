import "./style.css";
import {Navigate} from "react-router-dom";
import {isAuthenticated, signOut} from "./helpers/authHelper"
import {useState, useEffect} from "react"
import accicon from "../assets/accicon.png"

import icon  from "../assets/icon2.png"

const Navbar = () =>{
    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        async function checkAuthCall(){
          if( localStorage.getItem("token")){
                setIsAuth(await isAuthenticated()? true : false)
                // console.log(isAuth);
                return isAuth
            }
            else{
                return false
            }
        }
        checkAuthCall();
    },[isAuth])
    // const checkAuth = async() =>{   

    // }
    return(
        <div className="nav">
            <h1 className="navh1">TG</h1>
            {/* <img src={icon} alt="icon" className="icon" /> */}
            <ul className="navul">
                <li className="navli">
                    <a href="/cart" className="link" >Cart</a>
                </li>
                {
                    isAuth?(
                        <>
                        
                        <li className="navli">
                            <a href="register" className="link"><img src={accicon} alt="acc icon" className="accicon" /></a>
                        </li>
                        <li className="navli">
                            <a href="/login" className="link" onClick={()=>signOut()}>Logout</a>
                        </li>
                        </>
                    ):(
                        <>
                        <li className="navli">
                            <a href="/login" className="link" >Login</a>
                        </li>
                        <li className="navli">
                            <a href="register" className="link">Register</a>
                        </li>
                        </>
                    )
                }

            </ul>
        </div>
    )
}

export default Navbar;