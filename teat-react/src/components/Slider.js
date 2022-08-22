import React from "react";

export class Slider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {img: this.props.images[0][0]}
  }

  render () {

    return (

      <div className="slider">
          <div className="product-img">
            <img className="mainImg" src={this.state.img} /> <br />
          </div>
          <div className="selectImg">
            {this.props.images[0].map((img) => {
              return <img
              key={img} 
              src={img}
              onClick={() => this.setState({img: img})}
              width={100}
              height={87}
              style={img === this.state.img ? {border: "2px solid green"} : {}}
              />
            })}
          </div>
          
      </div>
    
    );
  }
  
}

export default Slider;


