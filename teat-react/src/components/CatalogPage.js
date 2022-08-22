import React from "react";
import Cart from "../Image/Circle Icon.svg"
import { Link, useParams } from "react-router-dom";


function withMyHook(Component) {
    return function WrappedComponent(props) {
      const {link} = useParams();
      return <Component {...props} link={link} />;
    }
}

export class CatalogPage extends React.Component {

    converter = (index) => {
        index = this.props.products.category.products.map((item) => item.prices.findIndex((idx) => idx.currency.symbol === this.props.currency.item[0]));
        return index[0];
    }

    render() {

        let arr = this.props.products.category.products;
        let array = [];

        if (this.props.link === "clothes") {
            array = arr.filter((obj) => obj.category === this.props.link)
        } else if (this.props.link === "tech") {
            array = arr.filter((obj) => obj.category === this.props.link)
        } else {
            array = this.props.products.category.products;
        }

        let style = {
            'pointerEvents' : 'none',
            'opacity' : '0.5',
        }

        console.log(arr)

        return (

            <div className="container-fluid">
                <div className="container">
                    <div className="category" style={{justifyContent: "flex-start"}}>
                        <h1>Category name</h1>
                    </div>
                    <div className="cards">
                        {array.map((item) => item.inStock === true ? 
                            <div key={item.id} className="card-container">
                                <div style={item.style} className="overflow-hidden">
                                    <Link to={`/catalog/${this.props.link || "all"}/${item.id}`}>
                                        <img className="img-size" variant="center" src={item.gallery[0]} alt="card"/>
                                    </Link>
                                    <div className="card-overlay-container">
                                        <div onClick={() => this.props.onAddToCart(item.id)} className="cart-btn">
                                            <img className="tag-img" src={Cart}/>  
                                        </div>
                                        <div className="card-body-container">
                                            <div className="card_title">{item.name}</div> 
                                            <div className="card_text">{this.props.currency.item[0]} {item.prices[this.converter()].amount}</div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div key={item.id} className="card-container">
                                <div style={style} className="overflow-hidden">
                                    <div className={`stock`}>Out of stock</div>
                                    <Link to={`/catalog/${this.props.link}/${item.id}`}>
                                        <img className="img-size" variant="center" src={item.gallery[0]} alt="card"/>
                                    </Link>
                                    <div className="card-overlay-container">
                                        <div onClick={() => this.props.onAddToCart(item.id)} className="cart-btn">
                                            <img className="tag-img" src={Cart}/>  
                                        </div>
                                        <div className="card-body-container">
                                            <div className="card_title">{item.name}</div> 
                                            <div className="card_text">{this.props.currency.item[0]} {item.prices[this.converter()].amount}</div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>s
            </div>
        );
    }
}

export default withMyHook(CatalogPage)