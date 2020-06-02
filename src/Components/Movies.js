import React, {useState, useEffect} from 'react';
import { ids } from "../movies.json"
import Grid from './Grid';
import Popup from "reactjs-popup";
import config from './config';
const axios = require('axios');
const firebase = require('firebase')

function Movies(props) {
    const [movies, setMovies] = useState([]);
    const [lists, setLists] = useState({});
    const [movieLists, setMovieLists] = useState({});
    const [curList, setCurList] = useState("All");
    const [page, setPage] = useState(0);
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

    const deleteMovie = (id) => {
        firebase.database().ref('movies').child(id).remove();

        let updates = {};

        for (var list in movieLists[id]){
            updates["lists/" + list + "/" + id] = null;
        }
        updates["movieLists/" + id] = null;

        firebase.database().ref().update(updates);
    }

    const createPair = (id, list, target) => {
        let updates = {
            ["lists/" + list + "/" + id]: true,
            ["movieLists/" + id + "/" + list]: true
        }

        target.value = "";
        firebase.database().ref().update(updates);
    }

    const setCurListHelper = (l) => {
        setCurList(l);
        let c = Object.keys(lists[l]).length - 1;
        setCount(c);
        setMovies([]);
        let ref = firebase.database().ref('movies');
        console.log(count);
        for(var i = 1; i < Math.min(9, c+1); i++) {
            ref.child(Object.keys(lists[l])[i]).once('value', (dataSnapshot) => {
                const val = dataSnapshot.val();
                setMovies(cur => [...cur, val]);
            });
        }
    }
    
    const loadMore = () => {
        let ref = firebase.database().ref('movies');
        let curLen = movies.length;
        for(var i = curLen + 1; i < Math.min(curLen + 9, Object.keys(lists[curList]).length); i++) {
            ref.child(Object.keys(lists[curList])[i]).once('value', (dataSnapshot) => {
                const val = dataSnapshot.val();
                setMovies(cur => [...cur, val]);
            });
        }
    }

    const getPage = () => {
            const movs = movies
                .filter(m => m != null && m.Title.toLowerCase().includes(search.toLowerCase()))
                .map(m =>
                <Popup className="popup" trigger={<img className="movie-item" alt={m.Title} src={m.Poster}/>} modal closeOnDocumentClick lockScroll postion="center center">
                    {close => (<div className="movie-popup">
                        <img className="movie-poster" alt={m.Title} src={m.Poster}/>                        
                        <div className="movie-info">
                            <h1>{m.Title}</h1>
                            <div className="imdb-rating">IMDB Rating: {m.imdbRating}</div>
                            <p><b>Director:</b> {m.Director}</p>
                            <p><b>Released:</b> {m.Released}</p>
                            <p><b>Synopsis:</b> {m.Plot}</p>
                            <button className="delete-movie" onClick={() => {deleteMovie(m.imdbID); close();}}>
                                Delete
                            </button>
                            <select className="movie-btn" onChange={e => createPair(m.imdbID, e.target.value, e.target)}>
                                <option value="" disabled selected>Add to list:</option>
                                {Object.keys(lists)
                                    .filter(l => (
                                        lists[l][m.imdbID] != true
                                    ))
                                    .map(l => (
                                        <option value={l}>{l}</option>
                                    ))
                                }
                            </select>
                        </div>                        
                    </div>)}
                </Popup>
            )
            return (
                <div>
                    <h2>
                        Movies
                    </h2>
                    <div className="movies-menu">
                        <select className="movie-btn" onChange={e => setCurListHelper(e.target.value)}>
                            <option value="All">All</option>
                            {lists != null && Object.keys(lists).map(l => (
                                l != "All" && <option value={l}>{l}</option>
                            ))}
                        </select>
                        <input className="movie-search" type="text" placeholder="Search.." value={search} onChange={e => setSearch(e.target.value)}/>
                    </div>
                    <Grid items={movs}/>
                    {lists != null && lists[curList] != null && count > movies.length && <button className="load-more" onClick={() => loadMore()}>
                        Load More
                    </button>}
                </div>
            );
    }

    return getPage();
    

}

export default Movies;