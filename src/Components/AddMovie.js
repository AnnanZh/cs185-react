import React, {useState, useEffect} from 'react';
import config from './config';
const axios = require('axios');
const firebase = require('firebase')

function Movies(props) {
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState({});
    const [movieLists, setMovieLists] = useState({});
    const [curList, setCurList] = useState("All");
    const [page, setPage] = useState(0);
    const [newId, setNewId] = useState("");
    const [newList, setNewList] = useState("");
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);
    const [shouldRender, setShowRender] = useState(true);

    useEffect(() => {
        setCurList("All")

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        let ref = firebase.database().ref('movies').orderByKey();

        ref.on('child_removed', (childSnapshot, prevChildKey) => {
            const deletedChild = childSnapshot.val();
            setMovies(curMovies => curMovies.filter(m => m.imdbID != deletedChild.imdbID));
            console.log(deletedChild.Title);
        });

        ref.limitToFirst(8).once('value', (dataSnapshot) => {
            const val = dataSnapshot.val();
            if(val != null) {
                setMovies(Object.values(val));
                console.log(val);
            }
        });

        

        let listRef = firebase.database().ref('lists');

        listRef.on('value', (dataSnapshot) => {
            const val = dataSnapshot.val();
            setLists(val);
            if(val != null) {
                setCount(Object.keys(val["All"]).length - 1);
            }
        });

        let movieListsRef = firebase.database().ref('movieLists');

        movieListsRef.on('value', (dataSnapshot) => {
            const val = dataSnapshot.val();
            setMovieLists(val);
        });
    }, [shouldRender])

    const addMovie = (evt) => {
        evt.preventDefault();
        axios({
            method: 'get',
            url: "https://www.omdbapi.com/?apikey=8d915169&i=".concat(newId),
        })
        .then(
            (response) => {
                firebase.database().ref('movies').child(response.data.imdbID).set({
                    imdbID: response.data.imdbID,
                    Title: response.data.Title,
                    Poster: response.data.Poster,
                    imdbRating: response.data.imdbRating,
                    Director: response.data.Director,
                    Released: response.data.Released,
                    Plot: response.data.Plot,
                    Actors: response.data.Actors
                });
                firebase.database().ref('lists').child("All").child(response.data.imdbID).set(true);
                firebase.database().ref('movieLists').child(response.data.imdbID).set({
                    All: true
                }).then(() => {
                    setNewId("");
                    setPage(0);
                    setShowRender(cur => !cur);
                });
            }
        )
        .then(
            alert("Success!")
        )
        
    }

    const getPage = () => {
            return (
                <div>
                    <form className="add-movie" onSubmit={addMovie}>
                        <h2>
                            Add Movie
                        </h2>
                        <label>
                            Please enter the IMDb ID of the movie:
                            <input type="text" value={newId} onChange={e => setNewId(e.target.value)}/>
                        </label>
                        <input type="submit" value="Add Movie" />
                    </form>
                </div>
            );
    }

    return getPage();
    

}

export default Movies;