import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import wangEditor from 'wangeditor';

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    var E = wangEditor;
    // console.log(window.wangEditor, wangeditor, 'window.wangEditor');
    var editor = new E('#div3');
    editor.customConfig.onchange = function (html) {
      // html 即变化之后的内容
      console.log(html, 'html')
    }
    editor.create()
  }
  
  handleChange(value) {
    console.log(value, 'value');
    this.setState({ text: value })
  }

  render() {
    return (
      <div id="div3"></div>
    )
  }
}
export default MyComponent;