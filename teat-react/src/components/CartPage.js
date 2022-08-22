import React from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export class CartPage extends React.Component {

    converter = (index) => {
        index = this.props.productItem.map((item) => item.prices.findIndex((idx) => idx.currency.symbol === this.props.currency.item[0]));
        return index[0];
    }

    onClickCheckout = () => {
        if(this.props.productItem.length > 0) {
            window.location.assign('/catalog/purchased')
        } else if(this.props.productItem.length === 0) {
            alert("There are no items in your cart")
        }
    }

    render() {

        const totalPrice = this.props.productItem.reduce((sum, obj) => Number(obj.prices[this.converter()].amount * obj.count) + sum, 0)
        const quantityItems = this.props.productItem.reduce((sum, obj) => obj.count + sum, 0)

        function truncated(num, decimalPlaces) {    
            let numPowerConverter = Math.pow(10, decimalPlaces); 
            return ~~(num * numPowerConverter) / numPowerConverter;
        }

        console.log(this.props.productItem)

        return (
            
            <div className="container-fluid">
                <div className="container">
                    <div className="header-container">
                        <span style={{fontWeight:"700"}}>Cart</span>
                    </div>
                    <div className="body">
                        <hr/>
                        {this.props.productItem.map((item) => (
                            <div key={item.id}>
                                <div className="body-container">
                                    <div className="parameters-container">
                                        <div className="description">
                                            <b>{item.brand}</b>
                                            <p>{item.name}</p>
                                            <p style={{fontWeight: "600"}}>{this.props.currency.item[0]} {item.prices[this.converter()].amount}</p>
                                        </div>
                                        {item.attributes.map((obj) => obj.name === "Capacity" || obj.name === "Size" || obj.name === "Color" ? ((
                                            <div key={obj.id} className="parameters-size">
                                                <div>{obj.name}:</div>
                                                    <div className="size-container">
                                                        <div className="size">
                                                        {obj.items.map((item) => obj.name === "Color" ? (
                                                            <button key={item.id} onClick={() => this.props.toggleColor(item.id)} className={`color-item ${this.props.parameters.color == item.id && 'active'}`}><span className="color-param" style={{background: `${item.value}` }}></span ></button> 
                                                        ) : (
                                                            <button key={item.id} onClick={() => this.props.toggleCopacity(item.id)} className={`size-item ${this.props.parameters.copacity == item.id && 'active'}`}>{item.id}</button> 
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )) : console.log(false))}
                                    </div>
                                    <div className="counter">
                                        <div className="count-container">
                                            <button onClick={() => this.props.onAddToCart(item.id)} className="count-btn">
                                                <HiOutlinePlus/>
                                            </button>
                                            <span className="count-item">{item.count}</span>
                                            <button onClick={() => this.props.onRemoveFromCart(item.id)} className="count-btn">
                                                <HiOutlineMinus/>
                                            </button>
                                        </div>
                                        <div className="product-img">
                                            <img style={{width:"100%"}} src={item.gallery[0]}/>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))}
                    </div>
                    <div className="footer-container">
                        <div className="footer-item">
                            <p>Tax 21%:</p>
                            <span>{this.props.currency.item[0]} {((totalPrice / 100) * 21).toFixed(2)}</span>
                        </div>
                        <div className="footer-item">
                            <p>Quantity:</p>
                            <span>{quantityItems}</span>
                        </div>
                        <div className="footer-item">
                            <p>Total:</p>
                            <span>{this.props.currency.item[0]} {truncated(totalPrice, 2)}</span>
                        </div>
                        <div className="btn-container">
                            <button onClick={this.onClickCheckout} className="btn-item btn-item2">Order</button>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default CartPage