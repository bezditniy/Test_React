import React from "react";
import { useParams } from "react-router-dom";
import Slider from "./Slider";


function withMyHook(Component) {
    return function WrappedComponent(props) {
      const {id} = useParams();
      return <Component {...props} id={id} />;
    }
}

export class ProductPage extends React.Component {

    converter = (index) => {
        index = this.props.products.category.products.map((item) => item.prices.findIndex((idx) => idx.currency.symbol === this.props.currency.item[0]));
        return index[0];
    }


    render() {

        let array = this.props.products.category.products.filter((obj) => obj.id === this.props.id);

        let images = array.map((item) => item.gallery)

        

        return (
            
            <div className="container-fluid">
                <div className="container">
                    <div className="product-container">
                        <div className="slider-container">
                            <Slider images={images}/>
                        </div>
                        <div className="body">
                            <div className="body-container">

                            {array.map((item) => (
                                <div key={item.id} className="parameters-container">
                                    <div className="description">
                                        <span>{item.brand}</span>
                                        <p>{item.name}</p>
                                    </div>
                                    {item.attributes.map((obj) => obj.name === "Capacity" || obj.name === "Size" || obj.name === "Color" ? ((
                                        <div key={obj.id} className="parameters-size">
                                            <div>{obj.name}:</div>
                                                <div className="size-container">
                                                    <div className="size">
                                                    {obj.items.map((item) => obj.name === "Color" ? (
                                                        <button key={item.id} onClick={() => this.props.toggleColor(item.id)} className={`color-item ${this.props.parameters.color == item.id && 'active'}`}><span className="color-param" style={{background: `${item.value}` }}></span ></button> 
                                                    ) : (
                                                        <button key={item.id} onClick={() => this.props.toggleCopacity(item.id, obj.id)} className={`size-item ${this.props.parameters.copacity == item.id && 'active'}`}>{item.id}</button> 
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )) : console.log(false))}
                                    <div className="price-container">
                                        <div>Price:</div>
                                        <div className="price">
                                            <p className="cost" style={{fontWeight: "600"}}>{this.props.currency.item[0]} {item.prices[this.converter()].amount}</p>
                                        </div>
                                    </div>
                                    <div className="btn-container">
                                        <button onClick={() => this.props.onAddToCart(item.id)} className="btn-item btn-item2">ADD TO CART</button>
                                    </div>
                                    <div className="inf-container">
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

export default withMyHook(ProductPage)