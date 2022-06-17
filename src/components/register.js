import {useState, useEffect} from "react"
import Navbar from "./Navbar"
import "./style.css";
import s4 from "../assets/s4.png"
import { Link } from "react-router-dom";
import { signUp,isAuthenticated } from "./helpers/authHelper"

const Register = () => {

    const [name, setName] = useState('');
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
        signUp({name,email,password,city})
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
        {console.log(process.env.REACT_APP_API)}
        <div className="reg-cont">
        <div className="right-reg">
            <img src={s4} alt="img" className="reg-img" />
        </div>
        <div>
        <center>
            <h1 className="f-h1">Register For a New Account</h1>
            {errorMessage()}
            {successMessage()}
            <form className="form-cont">
                <input type="text" name="name" className="f-inp" placeholder="Name" onChange={(e)=>setName(e.target.value) } value={name}/>
                <input type="email" name="email" className="f-inp" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="text" name="city" className="f-inp" placeholder="City" onChange={(e)=>setCity(e.target.value)} value={city} />
                <input type="password" name="password" className="f-inp" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                <button className="f-btn" onClick={handleSubmit}>Register</button>
            </form>
        </center>
        </div>
        </div>
        </>
    )
}

export default Register;