import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';

import tmdbApi, { category } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';

const MovieList = ({ category, type, id }) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (type !== 'similar') {
                switch(category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(type, { params });
                }
            } else {
                response = await tmdbApi.similar(category, id);
            }
            setItems(response.results);
        };
        getList();
    }, [category, type, id]); // Add dependencies here

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number // if used in similar call, ensure it's number
};

export default MovieList;
 