import React, { Component } from 'react';
import Image from 'next/image'

interface Movie { 
    title: string;
    poster_path: any;
    overview: string;
    vote_average?: number; 
    release_date?: string;
    first_air_date?: string;
}



class MovieCard extends Component<Movie> {
    constructor(props: Movie | Readonly<Movie>){
        super(props)
        this.state = this.props
    }
    render() {
        
        const checkDate = () => {
            let date = this.props.release_date?.slice(0,4)
            if(this.props.release_date == undefined){
                date = this.props.first_air_date?.slice(0,4)
              }
            return date
        }
        // console.log(this.props.release_date, 'movie release date')
        return (
            <div className='flex flex-wrap md:grid-cols-2 sm:grid-cols-1  font-display py-6 px-8 md:text-lg sm:text-xs bg-gray-800'>

                <div className='round-full w-1/2 flex-none w-44 relative'>
                <Image src={`https://image.tmdb.org/t/p/w500/${this.props.poster_path}`} width={600} height={900} alt="Movie poster" className=' w-full h-full rounded-xl' />
                </div>

                <figure className="md:flex rounded-xl p-8 md:p-0 bg-gray-700 max-w-2xl max-h-1/6">
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                 <div className="font-semibold text-gray-100">
                {this.props.title}{' '}
                </div> 
                <blockquote>
                <p className="md:text-lg sm:text-xs text-gray-100 max-w-2xl">
                {this.props.overview}
                </p> 
                </blockquote>
                <figcaption className="flex font-medium">
                    <div className='flex justify-around '>
                    <div className="rounded  py-3 px-6 bg-yellow-300 max-w-prose text-sm" >
                {this.props.vote_average}
                </div>  
                <div className="rounded py-3 px-6 mx-4 text-white border-yellow-300 border-2 max-w-prose text-sm">
                    {checkDate()}</div> 
                </div>
                </figcaption>
                </div>
                </figure>

            </div>
        );
    }
}

export default MovieCard;
