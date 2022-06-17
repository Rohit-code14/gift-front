import Navbar from "./Navbar"
import {useState, useEffect} from "react"
import {getAllProducts,getProductByLocation} from "./helpers/productHelper"
import { ToastContainer, toast } from 'react-toastify';

const ProductList = () =>{
    const[products,setProducts] = useState([]);
    useEffect(()=>{
        // getAllProducts().then((resp)=>setProducts(resp.products)).catch((err)=>console.log(err));
        async function funcCall(){
            return await getProducts();
        }
        funcCall();
    },[])
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart",[])
    }
    const[cart,setCart] = useState(localStorage.getItem("cart") ? [... new Set(JSON.parse(localStorage.getItem("cart")))] : []);
    async function getProducts(){
        let city = "trichy"
        // return await getProductByLocation({city}).then((resp)=>setProducts(resp.products)).catch((err)=>console.log(err));
        return await getAllProducts().then((resp)=>setProducts(resp.products)).catch((err)=>console.log(err));
    }
    async function addToCart(id){
        toast.info('Added to Cart!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        console.log("id = ",id,"  c = ",cart)
        await setCart([...cart,id])
        // setTimeout(function(){
          await localStorage.setItem("cart",JSON.stringify(cart))
            console.log("c = ",cart);
        // },100)
    }
    
    return(
        <>
        <Navbar />
        <div>
            <center><h2 className="p-h1">Recommended For You!</h2></center>
            <center className="p-list">
                {
                    products.map((m)=>{
                        return(
                        <div class="card-box" key={m._id}>
                            <img src={m.photos[0].secure_url} alt="Avatar" className="p-img" style={{width:"100%"}} />
                            <div class="card-container">

                                <h4><b>{m.name.length>13 ? m.name.substring(0,13) : m.name}</b></h4>
                                <p>Rs {m.price}</p>
                                <button className="p-btn" onClick={()=>addToCart(m._id)
                                }>Add to Cart</button>
                            </div>
                        </div>
                    )})
                }


            </center>
        </div>
        </>
    )
}

export default ProductList;