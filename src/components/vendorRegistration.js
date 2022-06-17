import Navbar from "./Navbar"
import "./style.css";
import s5 from "../assets/s5.png"
import { vendorSignUp,isAuthenticated } from "./helpers/authHelper"
import {useState, useEffect} from "react"
import { Link } from "react-router-dom";

const VendorRegistration = () => {

    const [name, setName] = useState('');
    const [shopname, setShopname] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [isAuth,setIsAuth] = useState(false);

    useEffect(()=>{
        async function checkAuthCall(){
            await checkAuth()
        }
        checkAuthCall()
    },[])
    const checkAuth = async() =>{   
        if( localStorage.getItem("token")){
            setIsAuth(await isAuthenticated()? true : false)
            // console.log(isAuth);
            return isAuth
        }
        else{
            return false
        }
    }
    // checkAuth()
    console.log(success);
    const handleSubmit =(event) =>{
        event.preventDefault()
        vendorSignUp({name,email,password,city,shopname})
        .then(data =>{
            console.log(data);
            if(data && data.err){
                setError(data.err)
            }
            else{
                // console.log(data);
                setEmail("")
                setName("")
                setPassword("")
                setCity("")
                setShopname("")
                setError("")
                setSuccess(true)
            }
        }).catch(err => {
            setError(err)
            console.log("Register Error ",err)
        })
    }
    const successMessage = () =>{
        return(
            <div className="success-m" style={{ display: success? "" :"none" }}>
                New Account Registered Successfully !!.. <Link to="/login">Click here to Login</Link>
            </div>
        )
    }
    const errorMessage = () =>{
        return(
            <div className="error-m" style={{ display: error? "" :"none" }}>
                {error} !!
            </div>
        )
    }
    return(
        <>
        <Navbar />
        <div className="reg-cont">
        <div className="right-reg">
            <img src={s5} alt="img" className="vreg-img" />
        </div>
        <div>
        <center>
            <h1 className="f-h1">Register For Vendor Account</h1>
            <form className="form-cont">
                {errorMessage()}
                {successMessage()}
                <input type="text" name="name" className="f-inp" placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name} />
                <input type="email" name="email" className="f-inp" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}  />
                <input type="text" name="city" className="f-inp" placeholder="City" onChange={(e)=>setCity(e.target.value)} value={city}  />
                <input type="text" name="city" className="f-inp" placeholder="Shop Name"  onChange={(e) => setShopname(e.target.value)} value={shopname} />
                <input type="password" name="password" className="f-inp" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}  />
                <button className="f-btn" onClick={(e)=>{
                    // e.preventDefault();
                    handleSubmit(e);
                    console.log("Clicked");
                }}>Register</button>
            </form>
        </center>
        </div>
        </div>
        </>
    )
}

export default VendorRegistration