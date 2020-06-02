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

    const createList = (evt) => {
        evt.preventDefault();

        firebase.database().ref('lists').child(newList).set({
            title: newList
        });

        setNewList("");
        setPage(0);
        setShowRender(cur => !cur);
        alert("Success!");
    }

    const getPage = () => {
            return (
                <form className="add-movie" onSubmit={createList}>
                    <h2>Create List</h2>
                        <label>
                            Please enter the name of the list:
                            <input type="text" value={newList} onChange={e => setNewList(e.target.value)}/>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
            );
        }

    return getPage();
    

}

export default Movies;