import {API} from "./backend"

export const placeOrder = async({shippingInfo, orderItems, paymentInfo, taxAmount, shippingAmount, totalAmount,token}) =>{
    // console.log("Helper order = ",order)
    return await fetch(`${API}/order/create`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            "Authorization":token
        },
        body: JSON.stringify({shippingInfo, orderItems, paymentInfo, taxAmount, shippingAmount, totalAmount,token})
    })
    .then(resp =>{ 
        // console.log(resp.json());
        return resp.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getOrder = async({oid,token}) =>{
    return await fetch(`${API}/order/get/${oid}`,{
        method:"GET",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            "Authorization":token
        }
    })
    .then(resp =>{ 
        // console.log(resp.json());
        return resp.json()
    })
    .catch(err => {
        console.log(err);
    })
}