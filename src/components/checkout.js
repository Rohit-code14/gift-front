import Navbar from "./Navbar";
import "./style.css";
import {useState, useEffect} from "react"
import {getProductById} from "./helpers/productHelper"
import {Navigate, Link} from "react-router-dom"
import {placeOrder} from "./helpers/orderHelper"
import {isAuthenticated} from "./helpers/authHelper"

const Checkout = () =>{
    let sum = 0;
    const [items,setItems] = useState([])
    const [name,setName] = useState("");
    const [address, setAddress] = useState("");
    const [city,setCity] = useState("");
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [pincode, setPincode] = useState("")
    const [mobno, setMobno] = useState("")
    const [error, setError] = useState("")
    const [orderStatus, setOrderStatus] = useState(false)
    let orderitems = [];


    const [isAuth,setIsAuth] = useState(false)
    useEffect(()=>{
        async function checkAuthCall(){
            await checkAuth()
        }
        checkAuthCall()
    },[])
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

    const [cartitems, setCartitems] = useState(localStorage.getItem("cart") ? [... new Set(JSON.parse(localStorage.getItem("cart")))] : []);
    async function getProducts(){
        console.log(cartitems)
        let respo = new Promise(async (resolve) => {

           resolve( await getProductById({cartitems}) )
        }).then((res) =>{
            console.log("p-res ",res)
            setTimeout(function(){
            setItems([...res])
        },100)
        })
        console.log("respo ",respo);

        console.log("items = ",items);
        console.log("order items = ",orderitems);
    }
    useEffect(()=>{
        async function getProd(){
            await getProducts();
        }
        getProd();
    },[])

    const errorMessage = () =>{
        return(
            <center>
            <div className="error-m" style={{ display: error? "" :"none" }}>
                {error} !!
            </div>
            </center>
        )
    }
    setTimeout(function(){
        items.forEach(function(itt){
            let ijk = {
               name: itt.name,
               quantity:1,
               image:itt.photos[0].secure_url,
               price:itt.price,
               product:itt._id
            }
            orderitems.push(ijk);
        })
    },200)

    const shippingInfo = {
            name,
            address,
            city,
            phno:mobno,
            postalCode:pincode,
            state,
            country,
        }
     const orderItems = orderitems
    const paymentInfo={
            id:"#aoimwdk12847r"
    }
    const taxAmount = 0
    const shippingAmount=0
    let totalAmount=sum
    

    async function handleSubmit(){
        if(!name || !address || !city || !state || !country || !mobno || !pincode){
            return setError("All fields must be filled")
        }
        const token = JSON.parse(localStorage.getItem("token"))
        totalAmount = sum;
        await placeOrder({shippingInfo, orderItems, paymentInfo, taxAmount, shippingAmount, totalAmount,token}).then((res)=>{
            console.log("Oreder resp ",res)
            localStorage.setItem("curr", res.order._id)
            setName("")
            setAddress("")
            setCity("")
            setState("")
            setCountry("")
            setMobno("")
            setPincode("")
            setOrderStatus(true)
        }).catch((err) =>{
            console.log(err)
        })

    }
    return(
        <>
        {
            isAuth ? (
                <>
                { orderStatus ? (
                    <Navigate to="/order" />

                    ) : (
                        <>
                        <Navbar />
                       <div className="co-cont">
                           <div className="left">
                           <>
                       { items.length!==0 ? (
                           <>
                           <center className="cart-container">
                               <div className="item-cont-head" style={{backgroundColor:"#a3a3a3"}}>
                                   <h2>Product Name</h2>
                                   <h2>Price</h2>
                                   <h2> </h2>
                               </div>
                               {   
                                   items.map((m) => {
                                       sum = sum + m.price
                                       return(
                                       <div className="item-cont" key={m._id}>       
                                           <h3>{m.name}</h3>
                                           <h3 style={{marginLeft:"60px"}}>Rs {m.price}</h3>
                                       </div>
               
                                   )}
                                   )
                               }
                   
                               <br/>
                               <br/>
                               <h2>Total Amount : Rs. {sum} </h2>
                               <br/>
                               <br/>
                           </center>
                           </>
                       ) : (
                           <>
                           <center className="cart-container">
                               <h1>Awww...Your Cart is Empty !!</h1>
                           </center>            
                           </>
                       )
                   }
                   </>
                           </div>
                           <div className="right">
                               <h1 className="co-h1">Shipping Details</h1>
                               {errorMessage()}
                               <form className="co-form">
                                   <input type="text" name="name" className="co-inp" placeholder="Name" 
                                   onChange={(e) => setName(e.target.value)}
                                   value = {name}
                                   />
                                   <input type="text" name="address1" className="co-inp" placeholder="Door No and Street Name" 
                                   onChange={(e) => setAddress(e.target.value)}
                                   value = {address}
                                   />
                                   <input type="text" name="address2" className="co-inp" placeholder="City" 
                                   onChange={(e) => setCity(e.target.value)}
                                   value = {city}
                                   />
                                   <input type="text" name="address3" className="co-inp" placeholder="State" 
                                   onChange={(e) => setState(e.target.value)}
                                   value = {state}
                                   />
                                   <input type="text" name="address4" className="co-inp" placeholder="Country" 
                                   onChange={(e) => setCountry(e.target.value)}
                                   value = {country}
                                   />
                                   <input type="number" name="address5" className="co-inp" placeholder="PinCode" 
                                   onChange={(e) => setPincode(e.target.value)}
                                   value = {pincode}
                                   />
                                   <input type="number" name="address6"className="co-inp" placeholder="Mobile No" 
                                   onChange={(e) => setMobno(e.target.value)}
                                   value = {mobno}
                                   />
                                   <button className="co-btn" onClick={(e)=>{
                                       e.preventDefault()
                                       handleSubmit()
                                       }}>Pay</button>
                               </form>
                           </div>
                       </div>
                           
                           </>

                )}
                </>
            ) : (
                // <Navigate to="/login" />
                <h1>Loading Checkout page</h1>
            )
        }
        
        
        </>
    )
}

export default Checkout;