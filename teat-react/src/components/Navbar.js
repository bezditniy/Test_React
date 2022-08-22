import React from "react";
import Logo from "../Image/logoTransparent.svg"
import Cart from "../Image/EmptyCart.svg"
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";

export class Navibar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          changeCurrency: this.props.currency.changeCurrency,
          openCart: false,
          isRotated: this.props.currency.isRotated
        };
    }

    onClickCheckout = () => {
        if(this.props.productItem.length > 0) {
            window.location.assign('/catalog/purchased')
        } else if(this.props.productItem.length === 0) {
            alert("There are no items in your cart")
        }
    }

    converter = (index) => {
        index = this.props.productItem.map((item) => item.prices.findIndex((obj) => obj.currency.symbol === this.props.currency.item[0]));
        return index[0];
    }

    render() {

        const totalPrice = this.props.productItem.reduce((sum, obj) => Number(obj.prices[this.converter()].amount * obj.count) + sum, 0)
        const quantityItems = this.props.productItem.reduce((sum, obj) => obj.count + sum, 0)

        function truncated(num, decimalPlaces) {    
            let numPowerConverter = Math.pow(10, decimalPlaces); 
            return ~~(num * numPowerConverter) / numPowerConverter;
        }

        const toggling = () => {
            if (this.state.changeCurrency === false) {
                this.setState({changeCurrency: true});
                this.setState({openCart: false});
                this.setState({isRotated: true});
            } else {
                this.setState({changeCurrency: false});
                this.setState({isRotated: false});
            }
        } 

        const openBtn = () => {
            if (this.state.openCart === false) {
                this.setState({openCart: true});
                this.setState({changeCurrency: false});
                this.setState({isRotated: false});
            } else {
                this.setState({openCart: false});
            }
        } 

        const options = [
            ["$", "USD"],
            ["£", "GBP"],
            ["¥", "JPY"],
        ]

        return (
            <div className="navbar">
                <div className="container">
                    <div className="navbar-nav">
                        <ul className="nav">
                            <li><Link to={`/catalog/clothes`} className="nav-link" href="#!">Women</Link></li>
                            <li><Link to={`/catalog/tech`} className="nav-link" href="#!">Men</Link></li>
                            <li><Link to={`/catalog/tech`} className="nav-link" href="#!">Kids</Link></li>
                        </ul>
                    </div>
                    <div>
                        <a href="/"><img src={Logo}/></a>
                    </div>
                    <div className="nav">
                        <div className="currency-container">
                            <button onClick={toggling} className="dropdown">
                                <span style={{display:"flex", fontSize:"18px"}}> {this.props.currency.item[0]}
                                    <span className={`arrow ${this.state.isRotated ? 'rotated' : ''}`}>
                                        <IoIosArrowDown />
                                    </span>
                                </span>
                            </button>
                            {this.state.changeCurrency && (
                                <ul className="dropdown-menu show">
                                    {options.map(option => (
                                        <li className="dropdown-item" role="button" onClick={() => this.props.onOptionClicked(option)} key={option[0]}>
                                            {option.join(" ")}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="cart">
                            <div onClick={openBtn}>
                                <img src={Cart}/>
                            </div>

                            {this.state.openCart && (
                                <div className="cart-modal-container">
                                    <div className="cart-modal">
                                        <div className="header-container">
                                            <p> <span style={{fontWeight:"700"}}>My Bag,</span> <span>{quantityItems}</span> items</p>
                                        </div>

                                        <div className="cart-product">
                                            {this.props.productItem.map((item) => (
                                                <div key={item.id} className="body-container">
                                                    <div className="parameters-container">
                                                        <div className="description">
                                                            <p>{item.brand}</p>
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
                                            ))}
                                        </div>

                                        <div className="footer-container">
                                            <div className="total">
                                                <p>Total:</p>
                                                <p>{this.props.currency.item[0]} {truncated(totalPrice, 2)}</p>
                                            </div>
                                            <div className="btn-container">
                                                <Link to={`/cart-page`}>
                                                    <button onClick={openBtn} className="btn-item">View Bag</button>
                                                </Link>
                                                <button onClick={this.onClickCheckout} className="btn-item btn-item2">Check Out</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>    
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Navibar