import React, { useState, useEffect } from 'react'
import PopularMovies from '../components/PopularMovies'
export const Popular = () => {
    const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=27d9047386421fb2f0d0905bf47b5cf4"

    const [movies, setMovies] = useState([])
    useEffect(() => {
        fetch(FEATURED_API).then(res => res.json())
            .then(data => {
                //console.log("data", data)
                setMovies(data.results)
            })
    }, [])
    return (
        <div className="movie-container">
            {movies.map(m => (
                <PopularMovies key={m.id} {...m} />
            ))}
        </div>
    )
}
export default Popular
