import React, { Component } from 'react';


const firebase = require('firebase')
const axios = require('axios').default;

export class AddMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MovieIDs: [],
            AddMovieID: "",
            loaded: false
        };

        this.firebase = this.props.firebase;

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

        let id = this.state.AddMovieID;
        let ref = firebase.database().ref('Movie/' + id);

        axios.get("https://www.omdbapi.com/?apikey=4131ae30&i=" + id)
            .then(function (response) {
                const title = response.data.Title;
                const director = response.data.Director;
                const rating = response.data.imdbRating;
                const poster = response.data.Poster;

                ref.set({ id, title, director, rating, poster });
                alert("Added Movie " + title + " to database");
            }.bind(this))
            .catch(function (error) {
                alert("Invalid Movie Id: " + id);
            })
            .then(function () {
                this.setState({
                    AddMovieID: ""
                });
            }.bind(this));
    }


    render() {
        return (
            <div className="inputForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Movie ID to Add :
                    <input
                            name="AddMovieID"
                            type="text"
                            required="required"
                            value={this.state.AddMovieID}
                            onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default AddMovie;