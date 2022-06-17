import Navbar from "./Navbar"
import "./style.css";
import pay1 from "../assets/pay2.png"
import gpay from "../assets/gpay.png"
import paypal from "../assets/paypal.png"
const Pay = () =>{
    return (
        <>
            <Navbar/>
            <div className="pay-cont">
                    <div className="left-pay">
                        <img src={pay1} className="pay-img" alt="card" />
                    </div>
                    <div className="pay-frame">
                        <h1 style={{marginBottom:"40px"}}>Payment</h1>
                        <form>
                            <input type="text" name="name" className="pay-inp" placeholder="Name"/> <br/>
                            <input type="number" name="cardno" className="pay-inp" placeholder="Card Number"/> 
                            <div className="pay-grp">
                                <div className="pay-grp-2">
                                    <input type="number" name="month" className="pay-inp" placeholder="Exp Month" /> 
                                    <input type="number" name="year" className="pay-inp" placeholder="Exp Year" /> 
                                </div>
                                <input type="number" name="cvv" className="pay-inp"  placeholder="CVV" /> 

                            </div>
                            <button className="pay-btn">Pay</button>
                        </form>
                            <img src={gpay} alt="gpay" className="upi-g" />
                            <img src={paypal} alt="paypal" className="upi" />   
                    </div>
            </div>
        </>
    )
}

export default Pay;