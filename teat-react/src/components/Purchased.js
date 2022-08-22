import React from "react";

export class Checkout extends React.Component {

    render () {

        return (

            <div className="container-fluid">
                <div className="container">
                    <div className="contact-container">
                        <h2 style={{fontWeight: "bold", textAlign: "center", paddingBottom: "3px"}}>Thank You.</h2>
                        <p style={{textTransform: "none", textAlign: "center", paddingBottom: "3px"}}>Your order was completed succesfully.</p>
                        <p><b>Phone: </b><a style={{textDecoration: "none"}} href="tel:+1(800)999-9999">1(800)999-9999</a></p>
                        <p><b>Email: </b><a style={{textDecoration: "none", textTransform: "none"}} href="mailto:support@react-shop.com">support@react-shop.com</a></p>
                    </div>
                </div>
            </div>
        )
    }    

}

export default Checkout