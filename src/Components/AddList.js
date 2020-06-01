import React, { Component } from 'react';
const firebase = require('firebase')

export class AddList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            AddListName: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();


        let id = this.state.AddListName;
        let ref = firebase.database().ref('List/' + id);

        ref.set({ id });
        alert("Added List " + id + " to database");

        this.setState({ AddListName: "" });

    }


    render() {
        return (
            <div className="inputForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        List to Add:
                    <input
                            name="AddListName"
                            type="text"
                            required="required"
                            value={this.state.AddListName}
                            onChange={this.handleInputChange} />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default AddList;