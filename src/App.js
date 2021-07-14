import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

  const [favouritesWithData, setFavouritesWithData] = useStickyState([],"favedStorage");
  console.log("fav with data");
  console.log(favouritesWithData);
  const [favourites, setFavourites] = useState(favouritesWithData.length>0 ? favouritesWithData.map(a => a.id):[]);


  function useStickyState(defaultValue, key) {
    const stickyValue = window.localStorage.getItem(key);
      console.log(stickyValue);
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      console.log(stickyValue);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }
  
  
	const getMovieRequest = async (searchValue) => {
		//const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fcac3325cf0462d98ed23a9406dce923&query=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.results!=null) {
			setMovies(responseJson.results);
		}
	};

  const favedMovieList = () => {
    //setFavouritesWithData(movies.filter(movie=>{if(Array.prototype.includes.call(favourites, movie.id))return movie}));
    return movies.filter(movie=>{if(Array.prototype.includes.call(favourites, movie.id))return movie})

  };

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);
  useEffect(() => {
		setFavouritesWithData(movies.filter(movie=>{if(Array.prototype.includes.call(favourites, movie.id))return movie}));
	}, [favourites]);


	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
      {console.log(favourites)}
      {favourites.length>0 ?
        <div className='row'>
        <h2>Your Favs</h2>
				<MovieList movies={favouritesWithData} favList={favourites} setfav={setFavourites}/>
			</div>
        :
        <div></div>
      }
      
			<div className='row'>
      <h2>Your Search</h2>
				<MovieList movies={movies} favList={favourites} setfav={setFavourites}/>
			</div>
		</div>
	);
};

export default App;