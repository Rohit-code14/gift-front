import {API} from "./backend"
// require('dotenv').config();

export const getAllProducts = async() =>{
    return await fetch(`${API}/product/all/`)
    .then(resp =>{ 
        // console.log(resp.json());
        return resp.json()
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}
export const getProductByLocation = async({city}) =>{
    return await fetch(`${API}/product/city/${city}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json"
        },
        // body: JSON.stringify(user)
    })
    .then(resp =>{ 
        // console.log(resp.json());
        return resp.json()
    })
    .catch(err => {
        console.log(err);
    })
}
export const getProductById = async({cartitems}) =>{
    var items = [];
    console.log("citems",cartitems)
    async function getItemById(i){
        const it = await fetch(`${API}/product/${i}`)
        console.log("res - ",it.json().then((r) => {
            console.log("p - ",r.product)
            items.push(r.product)
        }))
        console.log("itttt- ",it)
    }
    // for(var i=0;i<cartitems.length; i++){
    //     getItemById(cartitems[i])
    // }
    cartitems.forEach(getItemById)
    console.log("help - > ",(items))
    return items;
}