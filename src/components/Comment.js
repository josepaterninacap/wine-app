import React, { Component } from 'react';
import './Comment.css';

export class Comment extends Component {
  render() {
    return (
      <p data-test-id="wine-comment"
        className="comment"
        data-title={this.props.comment.title}
        data-date={this.props.comment.date}>
        {this.props.comment.content}
      </p>
    );
  }
}
