import {useEffect, useState} from "react"
import Navbar from "./Navbar"
import "./style.css"
import {getOrder} from "./helpers/orderHelper"
import { Navigate } from "react-router-dom"
const Order = () =>{

    const [ord, setOrd] = useState({});
    const [load,setLoad] = useState(false);

    async function getOneOrder(){
        let oid = localStorage.getItem("curr")
        console.log("oid",oid)
        let token = JSON.parse(localStorage.getItem("token"))
        await getOrder({oid,token}).then((res) => {
            console.log(res);
            localStorage.setItem("cart",[]);
            localStorage.setItem("curr","");
            setTimeout(function(){
                setOrd(res.order)
                setLoad(true)
            },200);
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    useEffect(()=>{
        async function ordCall(){
            await getOneOrder()
        }
        ordCall()
    },[])

    return(
        <>
        {ord && load ? (
                    <>
                    <Navbar />
                    <h1 style={{marginLeft:"160px",marginTop:"25px"}}>Order Details</h1>
                    <center>
                        <div className="success-msg">
                            <h3>Order Placed Sucessfully !!</h3>
                        </div>
                        <div className="top-box">
                            <div className="address">
                                <h2 className="ord-head">Shipping Details</h2>
                                <h3>{ord.shippingInfo.name}</h3>
                                <p>{ord.shippingInfo.address}</p>
                                <p>{ord.shippingInfo.city},</p>
                                <p>{ord.shippingInfo.state} - {ord.shippingInfo.postalCode}</p>
                            </div>
                            <div className="payment">
                                <h2 className="ord-head">Payment Method</h2>
                                <p>UPI - GooglePay</p>
                            </div>
                            <div className="delivery">
                                <h2 className="ord-head">Delivery Details</h2>
                                <p>Expected Delivery By 25.6.2022</p>
                            </div>
                        </div>
                        <div className="next-box">
                            <div className="left-o">
                                <h3 className="ord-head">Product</h3>
                                <h3 className="ord-head">Price</h3>
                                {
                                    ord.orderItems.map((m) => (
                                        <>
                                            <p>{m.name}</p>
                                            <p>Rs {m.price}</p>
                                        </>
                                    ))
                                }
                            </div>
                            <div className="right-o">
                                {/* <button className="o-btn">Track Order</button> */}
                                <h3 className="ord-head">Order Status</h3>
                                <h3>{ord.orderStatus}</h3>
                                <br/>
                                <button className="o-btn">Cancel Order</button>
                                {/* <button></button> */}
                            </div>
                        </div>
                    </center>
                </>
        ) : (
            <>
                {/* <Navigate to="/out" /> */}
                <h1>Order loading</h1>
            </>
        )
     }
        
        </>
    )
}

export default Order;