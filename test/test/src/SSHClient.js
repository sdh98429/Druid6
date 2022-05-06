import * as fs from 'fs';
import React from 'react';
import ReactMarkdown from 'react-markdown';

class Markdown extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        doc: 'null',
      };
    }
  
    componentDidMount() {
      fs.readFile('./../md-documents/eslint.md', 'utf8', (err, eslint) => {
        if (err) {
          return console.error(err);
        }
        console.log(`async read file: ${eslint.toString()}`);
        return this.setState({
          doc: eslint,
        });
      });
    }
  
    render() {
      return <ReactMarkdown className="markdown" source={this.state.doc} />;
    }
  }
  
  export default Markdown;