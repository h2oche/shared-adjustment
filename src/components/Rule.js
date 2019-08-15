import React, { Component } from 'react';

export class Rule extends Component {
  render() {
    return (
      <div>
        Rule {this.props.match.url}
      </div>
    )
  }
}

export default Rule
