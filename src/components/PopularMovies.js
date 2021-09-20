import React from 'react'
export const PopularMovies = ({ date, overview, poster_path, title, name, vote_average }) => {

    const IMAGE_API = "https://image.tmdb.org/t/p/w1280/"

    return (
        <>
            <div className="movie">
                <img src={`${IMAGE_API}${poster_path}`} alt={title} />
                <div className="movie-info">
                    <h4>{title || name}</h4>
                    <span>{vote_average}</span>


                </div>
                <div className="movie-over">
                    <h3>overview</h3>
                    <p>{overview}</p>

                </div>
            </div>

        </>
    )
}
export default PopularMovies