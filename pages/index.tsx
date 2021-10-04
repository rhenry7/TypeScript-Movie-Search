import type { NextPage } from 'next'
import MovieCard from '../components/MovieCard'
import axios from 'axios'
import React, { Key, useEffect, useState } from 'react';

// API for trending movie
const resource = 'https://api.themoviedb.org/3/trending/movie/week?api_key=1428f013f4c3b1bde6b7030433881874'
// API for movie search 'https://api.themoviedb.org/3/search/movie?api_key=1428f013f4c3b1bde6b7030433881874&language=en-US&page=1&include_adult=false'



const Home: NextPage = () => {   
  const [movies, setMovies ] = useState<any>([]);
  const [streamType, setStreamType] = useState<string>('movie');
  const [searchTerm, setSearchTerm] = useState<string>('marvel');
  useEffect(() => {
    (
      async function fetchURL () {
        axios.get<any>(resource)

        .then((response) => {
          // console.log(response)
          // use 'data.results' because it returns an array
          // response.data is an object, .map() cannot work with objects
          let moviesResponse = response.data.results
          // console.log(moviesResponse)
          setMovies(moviesResponse)
        }
        )
      }
    )();
    }, [])

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if(searchTerm ==  null){
        return setSearchTerm('marvel')
      } else {
        axios.get<any>(`https://api.themoviedb.org/3/search/${streamType}?api_key=1428f013f4c3b1bde6b7030433881874&llanguage=en-US&query=${searchTerm}&page=1&include_adult=false`)
        .then((response) => {
          // console.log('movie search response: ', response)
          let moviesResponse = response.data.results;
          setMovies(moviesResponse)
         
        }) 
      }
       
    }

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setSearchTerm(e.target.value);
      console.log('search term: ',searchTerm)
     

    }

  return (
    <div>
      <div className='flex justify-between font-display text-2xl p-4 font-medium bg-gray-900 text-gray-100' >
     <div className='flex justify-around w-1/4'>
     <button className="bg-black hover:bg-gray-700 active:bg-green-200 font-medium text-red-600 py-2 px-4 rounded-full">StreamFlix</button>
   
<form onSubmit={handleSubmit}>
<button className="bg-gray-800 hover:bg-gray-700 active:bg-green-200  text-white py-2 px-4 rounded-full" onClick={()=>(setStreamType('movie'))} >
  Movie
</button>
</form>
<form onSubmit={handleSubmit}>
<button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-full" onClick={()=>(setStreamType('tv'))}>
  TV
</button>
</form>

     </div>
       
        <div className='flex'>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-between'>
              <div className='mx-3'>
              <input className="flex shadow appearance-none border rounded-full w-1/8 py-2 px-3 bg-gray-800 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={searchTerm} onChange={handleChange} placeholder="Search.." ></input>
              </div>
           
           <div className='flex'>
           <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full">Search</button>
           </div>
            </div>
         
          </form>
    
        </div>
      </div>
    {movies.map((movie: any | Key ) => (
      // eslint-disable-next-line react/jsx-key
      <MovieCard {...movie}  /> 
    ))}
    </div>
  )
}

export default Home
function handleSubmit() {
  throw new Error('Function not implemented.');
}

