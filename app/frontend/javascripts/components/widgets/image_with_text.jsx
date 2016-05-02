import React from "react";

const ImageWithText = React.createClass({
  getImageStyle: function(url){
    return {
      backgroundImage: "url("+url+")"
    }
  },

  renderImage: function(options){
    const image = options.image;
    const position = options.position;

    if(typeof(image) !== "undefined"){
      let _class = `image image-${position}`

      if(image.src){
        var style = this.getImageStyle(image.src);
      }

      if(image._class){
        _class += (" "+image._class)
      }

      return <div className={_class} style={style}/>
    }
  },

  renderText: function(){
    const text = this.props.text;

    if(text){
      let _class = "text";

      if(text._class){
        _class += (" "+text._class)
      }

      return <span className={_class}>{text.content}</span>
    }

  },

  render: function(){
    var _class = this.props._class;
    var class0 = "image-with-text";

    if(_class){
      class0 += (" "+_class)
    }

    return (
      <div
        className={class0}
        onClick={this.props.onClick}
      >
        {
          this.renderImage({
            image: this.props.image,
            position: "0"
          })
        }

        {this.renderText()}

        {
          this.renderImage({
            image: this.props.image1,
            position: "1"
          })
        }
      </div>
    )
  }
})

module.exports = ImageWithText
