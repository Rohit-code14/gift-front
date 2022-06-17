import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import {getAllProducts} from "./helpers/productHelper"
import {Card, CardBody, CardImg, CardTitle, CardText,CardSubtitle, Button, CardGroup} from "reactstrap";
import gift1 from "../assets/gift1.jpg";
import gift2 from "../assets/gift2.jpg";
import gift3 from "../assets/gift3.jpg";
import gift4 from "../assets/gift4.jpeg";
const CardComponent = () => {
    const[products,setProducts] = useState([]);
    useEffect(()=>{
        async function callGetProducts(){
            await getAllProducts().then((resp)=>setProducts(resp.products)).catch((err)=>console.log(err));
        }
        callGetProducts();
    },[])
    const[cart,setCart] = useState(localStorage.getItem("cart") ? [...new Set(JSON.parse(localStorage.getItem("cart")))] : []);

    console.log(cart)
    function addToCart(id){
        if(cart.length===0){    
            setCart([id])
            return;
        }
        setCart([...cart,id]);
        setTimeout(function(){

            localStorage.setItem("cart",JSON.stringify(cart))
        },200)
        console.log(cart);
    }

    return(
        <div>
        <center>
        <div className='group-grid'>
            {
                products.map((m)=>{
                    if(m.name===""){
                        return(
                            <div></div>
                        )
                    }else{
                        return(
                            (
                                    <Card style={{margin:15}} key={m._id}>
                                        <CardImg src={m.photos[0].secure_url} className="p-img-hp"/>
                                        <CardBody>
                                            <CardTitle tag="h3">{m.name}</CardTitle>
                                            <CardSubtitle tag="h4"> Rs. {m.price}</CardSubtitle>
                                        </CardBody>
                                            <button className="mp-btn" 
                                            onClick={()=>{
                                                addToCart(m._id)
                                                localStorage.setItem("cart",JSON.stringify(cart))
                                                }}>Add to Cart</button>
                                    </Card>
                                )
                        )
                    }
                }
                )
            }
        </div>
    </center>
        </div>
    )
}

export default CardComponent;