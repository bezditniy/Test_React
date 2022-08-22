import React from "react";
import Cart from "../Image/Circle Icon.svg"
import { Link, useParams } from "react-router-dom";

function withMyHook(Component) {
    return function WrappedComponent(props) {
      const {link} = useParams();
      return <Component {...props} link={link} />;
    }
}

export class Card extends React.Component {

    render() {
        return (
            <div className="card-container">
                <div style={this.props.style} className="overflow-hidden">
                    <div className={`${this.props.tock} stock`}>Out of stock</div>
                    <Link to={`/catalog/${this.props.link}/${this.props.id}`}>
                        <img className="img-size" variant="center" src={this.props.image} alt="card"/>
                    </Link>
                    <div className="card-overlay-container">
                        <div onClick={() => this.props.onAddToCart(this.props.id)} className="cart-btn">
                            <img className="tag-img" src={Cart}/>  
                        </div>
                        <div className="card-body-container">
                            <div className="card_title">{this.props.name}</div> 
                            <div className="card_text">{this.props.symbol} {this.props.price}</div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withMyHook(Card)