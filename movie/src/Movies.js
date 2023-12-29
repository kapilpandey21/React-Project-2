import React from 'react'
import { useGlobalContext } from './Context'
import { NavLink } from 'react-router-dom'

const Movies = () => {
  let { movie, isLoading } = useGlobalContext()

  if(isLoading){
    return (
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }

  return (
    <>
      <section className='movie-page'>
        <div className='container grid grid-4-col'>
          {movie.map((firstmovie) => {
            let { imdbID, Title, Poster } = firstmovie
            let moviename = Title.substring(0,15)
            return (

              <NavLink to={`movie/${imdbID}`}key={imdbID}>
                <div className='card'>
                  <div className='card-info'>
                    <h2>{moviename.length>= 15? `${moviename}...`:moviename}</h2>
                    <img src={Poster}></img>
                  </div>
                </div>
              </NavLink>

            )
          })}
        </div>
      </section>
    </>
  )
}

export default Movies
