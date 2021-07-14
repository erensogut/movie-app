import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";


const MovieList = (props) => {
    const addFavList = (movieId) => {
        const faved = [...(props.favList),movieId];

        props.setfav(faved);
      };
      const removeFavList = (movieId) => {
        
        const faved = [...(props.favList)];
        const removedFaved = faved.filter(movie=>{if(movie!= movieId)return movie})
        props.setfav(removedFaved);
      };
    return (
        <>

            {props.movies.map((movie, index) => (
                <div className='col image-container d-flex justify-content-start m-3'>
                    <div class="card" >
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt='movie'></img>
                        <div class="card-body">
                            <h5 class="card-title">{movie.original_title}</h5>
                            <p class="card-text overflow-hidden">{movie.overview}</p>
                            {
                                props.favList!== 'undefined' && Array.prototype.includes.call(props.favList, movie.id)  ?
                                    <div class="rightAlign">
                                        <i onClick={ () => removeFavList(movie.id) } class="bi bi-bookmark-check-fill"></i>
                                    </div>
                                :
                                    <div class="rightAlign">
                                        <i onClick={ () => addFavList(movie.id) } class="bi bi-bookmark"></i>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;