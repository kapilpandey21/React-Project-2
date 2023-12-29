import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { API_URl } from './Context'

const Singlemovie = () => {
  let { id } = useParams()
  let [isloading, setIsloading ] = useState(true)
  let [movie, setmovie] = useState('')
  

  let getMovies = async (url) => {
    setIsloading(true)
    try {
      let res = await fetch(url)
      let data = await res.json()
      console.log(data)
      if (data.Response === 'True') {
        setIsloading(false)
        setmovie(data)

      }
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let timeout = setTimeout(() => {
      getMovies(`${API_URl}&i=${id}`)
    }, 800)

    return () => clearTimeout(timeout)
  }, [id])
  if(isloading){
    return (
      <div className='movie-section'>
        <div className='loading'>Loading...</div>
      </div>
    )
  }
  return (
   <section className='movie-section'>
<div className='movie-card'> 
<figure>
  <img src ={movie.Poster} alt=''></img>
</figure>
<div className='card-content'>
<p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to='/' className='back-btn'>Go Back</NavLink>
</div>
</div>
   </section>
  )
}

export default Singlemovie