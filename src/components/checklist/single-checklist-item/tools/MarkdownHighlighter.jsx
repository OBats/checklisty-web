import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import style from '../../css/SingleChecklistItem.module.css';

class MarkdownHighlighter extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
    value: null,
  };

  render() {
    const { language, value } = this.props;
    if (value) {
      return (
        <SyntaxHighlighter
          language={language}
          style={docco}
          className={style.highlighter}
        >
          {value}
        </SyntaxHighlighter>
      );
    }
    return null;
  }
}

export default MarkdownHighlighter;
