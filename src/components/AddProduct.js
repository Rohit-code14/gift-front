import React from "react"
import { useState } from "react"
import Navbar from "./Navbar"
const AddProduct = () =>{
    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    const [price, setPrice] = useState('')
    return(
        <>
        <Navbar />
        <center>
            <div>
                <form>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </form>
            </div>
        </center>
        </>
    )
}