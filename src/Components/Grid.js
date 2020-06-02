import React, { Component } from 'react';

class Grid extends Component {

    render() {
        return (
            <div className="grid">
                {this.props.items}
            </div>
        );
    }
}

export default Grid;