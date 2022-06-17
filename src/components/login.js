import React,{useEffect, useState} from "react"
import {isAuthenticated, signIn, authenticate} from "./helpers/authHelper"
import {Navigate} from "react-router-dom"
import LoadingOverlay from 'react-loading-overlay-ts';


import Navbar from "./Navbar"
import "./style.css";
import s3 from "../assets/s3.png"
import s1 from "../assets/s1.png"
const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const [didRedirect, setDidRedirect] = useState('')
    const [error,setError] = useState('')
    const [wrong,setWrong] = useState(false)
    const {token} = isAuthenticated()

    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        async function checkAuthCall(){
            await checkAuth()
        }
        checkAuthCall()
    })
    const checkAuth = async() =>{   
        if( localStorage.getItem("token")){
            setIsAuth(await isAuthenticated()? true : false)
            console.log(isAuth);
            return isAuth
        }
        else{
            return false
        }
    }
    // checkAuth()
    // const url = "http://localhost:5000/api/login"
    if(token){
        return <Navigate to="/suggest" />
    }
    const handleSubmit =async () =>{

        setLoading(true)
        const user = {
            email,
            password
        }
        signIn(user)
        .then(data =>{
            if(data && data.err){
                setError(data.err)
                setLoading(false)
            }
            else{
                console.log(data);
                setEmail("")
                setPassword("")
                setLoading(false)
                if(data.user.role !== "vendor"){
                    localStorage.removeItem("token")
                    setWrong(true)
                    return;
                }
                authenticate(data.token,()=>{
                    setDidRedirect(true);
                })
            }
        })
        .catch(console.log("Login Error"))

    }
    const redirectComponent = () =>{
        return(
                didRedirect && (
                    <Navigate to="/suggest" />
                )
            )
        
    }
    const wrongUser = () =>{
        return(
                wrong && (
                    <Navigate to="/login" />
                )
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
        {/* {isAuth ? (
            <Navigate to="/suggest" />
        ) : ( */}

        {/* <LoadingOverlay
                active={loading}
                spinner
                text='Logging In....'
        > */}
        <Navbar />
        <div className="l-cont">
        <div className="l-left">
            <img src={s3} alt="img" className="log-img-2-1"/>
        </div>
        <center>
            <h1 className="f-h1">Login to Your Account</h1>
            {errorMessage()}
            <div className="form-cont">
                <input type="email" name="email" className="f-inp" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <input type="password" name="password" className="f-inp" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <button className="f-btn" onClick={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                    }}>Login</button>
            </div>
        </center>
        <div className="l-right">
            <img src={s1} alt="img" className="log-img-1"/>
        </div>
        </div>
        {redirectComponent()}
        {wrongUser()}
        {/* </LoadingOverlay>    */}
        {/* )} */}
        </>
    )
}
export default Login;