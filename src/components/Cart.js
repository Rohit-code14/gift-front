import Navbar from "./Navbar"
import bin from "../assets/bin.jpg"
import "./style.css";
import {useState, useEffect} from "react"
import {getProductById} from "./helpers/productHelper"
import {Navigate, Link} from "react-router-dom"
const Cart = () =>{

    // let items = []
    let sum = 0;
    const [items,setItems] = useState([])
    // let items = [];
    const [cartitems, setCartitems] = useState(localStorage.getItem("cart") ? [...new Set(JSON.parse(localStorage.getItem("cart")))] : []);
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
    }
    useEffect(()=>{
        async function getProd(){
            await getProducts();
        }
        getProd();
    },[])
    
    console.log("Above if",items)
    return(
    <>
        { items.length!==0 ? (
            <>
            <Navbar />
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
                            <img src={bin} alt="bin" className="bin" width="40px" onClick={()=>{
                                let newi = items.filter((n)=>n._id!==m._id)
                                setItems([...newi])
                                let cit = cartitems.filter((j) => j!==m._id)
                                setCartitems(cit)
                                localStorage.setItem("cart",JSON.stringify(cit))
                            }}/>
                        </div>

                    )}
                    )
                }
                {/* <div className="item-cont">
                    <h3>Teddy</h3>
                    <h3 style={{marginLeft:"150px"}}>Rs 578</h3>
                    <img src={bin} alt="bin" className="bin" width="40px"/>
                </div>
                <div className="item-cont">
                    <h3>Flower shower</h3>
                    <h3 style={{marginLeft:"50px"}}>Rs 299</h3>
                    <img src={bin} alt="bin" className="bin" width="40px"/>
                </div> */}
    
                <br/>
                <br/>
                <h2>Total Amount : Rs. {sum} </h2>
                <br/>
                <br/>
                <button className="cart-btn">
                    <Link to="/out" className="cart-link" >Checkout</Link>
                </button>
            </center>
            </>
        ) : (
            <>
            <Navbar />
            <center className="cart-container">
                <h1>Awww...Your Cart is Empty !!</h1>
                <button onClick={()=>(<Navigate to="/suggest"/>)}>Browse Products</button>
            </center>            
            </>
        )
    }
    </>
    )
    // if(cartitems !== undefined){

    //     // getProducts();
    //     console.log("in",items)
    //     return(
    //         <>
    //         <Navbar />
    //         <center className="cart-container">
    //             <div className="item-cont-head" style={{backgroundColor:"#a3a3a3"}}>
    //                 <h2>Product Name</h2>
    //                 <h2>Price</h2>
    //                 <h2> </h2>
    //             </div>
    //             {   
    //                 items.map((m) => 
    //                     (
    //                     <div className="item-cont">
                            
    //                         <h3>{m.name}</h3>
    //                         <h3 style={{marginLeft:"60px"}}>Rs {m.price}</h3>
    //                         <img src={bin} alt="bin" className="bin" width="40px"/>
    //                     </div>

    //                 )
    //                 )
    //             }
    //             <div className="item-cont">
    //                 <h3>Teddy</h3>
    //                 <h3 style={{marginLeft:"150px"}}>Rs 578</h3>
    //                 <img src={bin} alt="bin" className="bin" width="40px"/>
    //             </div>
    //             <div className="item-cont">
    //                 <h3>Flower shower</h3>
    //                 <h3 style={{marginLeft:"50px"}}>Rs 299</h3>
    //                 <img src={bin} alt="bin" className="bin" width="40px"/>
    //             </div>
    
    //             <br/>
    //             <br/>
    //             <h2>Total Amount : Rs. {sum} </h2>
    //             <br/>
    //             <br/>
    //             <button className="cart-btn">Checkout</button>
    //         </center>
    //         </>
    //     )
    // }
    // else{
    //     console.log("Eruku")
    //     return(
    //         <>
    //         <Navbar />
    //         <center className="cart-container">
    //             <h1>Awww...Your Cart is Empty !!</h1>
    //             <button>Browse Products</button>
    //         </center>            
    //         </>
    //     )
    // }

}

export default Cart;