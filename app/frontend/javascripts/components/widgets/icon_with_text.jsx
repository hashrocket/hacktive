const ImageWithText = React.createClass({
  getImageStyle: function(url){
    return {
      backgroundImage: "url("+url+")"
    }
  },

  render: function(){
    var _class = this.props._class;
    var _image0 = this.props.image;
    var _image1 = this.props.image1
    var _text = this.props.text;
    var class0 = "image-with-text";

    if(_class){
      class0 += (" "+_class)
    }

    if(typeof(_image0) !== "undefined"){
      var class1 = "image image-0"

      if(_image0.src){
        var image0Style = this.getImageStyle(_image0.src);
      }

      if(_image0._class){
        class1 += (" "+_image0._class)
      }

      var image0 = (
        <td className="image-cell image-cell-0">
          <div className={class1} style={image0Style}/>
        </td>
      );
    }

    if(_text){
      var class2 = "text";

      if(_text._class){
        class2 += (" "+_text._class)
      }

      var text = (
        <td className="text-cell">
          <span className={class2}>{_text.content}</span>
        </td>
      )
    }

    if(typeof(_image1) !== "undefined"){
      var class3 = "image image-1";

      if(_image1._class){
        class3 += (" "+_image1._class)
      }

      if(_image1.src){
        var image1Style = this.getImageStyle(_image1.src);
      }

      var image1 = (
        <td className="image-cell image-cell-1">
          <div className={class3} style={image1Style}/>
        </td>
      );
    }

    return (
      <table
        className={class0}
        onClick={this.props.onClick}
      >
        <tbody>
          <tr>
            {image0}
            {text}
            {image1}
          </tr>
        </tbody>
      </table>
    )
  }
})

module.exports = ImageWithText
