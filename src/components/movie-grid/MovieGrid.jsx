import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Input from '../input/Input'
import Button from '../button/Button'; // Add this import
import Skeleton from '../skeleton/Skeleton';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const MovieGrid = props => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    
    // Add these refs
    const observer = useRef();
    const lastMovieElementRef = useRef();

    const { keyword } = useParams();

    // Modify getList to handle initial load
    useEffect(() => {
        const getList = async () => {
            try {
                let response = null;
                if (keyword === undefined) {
                    const params = {};
                    switch(props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                            break;
                        default:
                            response = await tmdbApi.getTvList(tvType.popular, {params});
                    }
                } else {
                    const params = {
                        query: keyword
                    }
                    response = await tmdbApi.search(props.category, {params});
                }
                setItems(response.results);
                setTotalPage(response.total_pages);
            } catch (error) {
                console.log('Error fetching initial data:', error);
            }
        }
        getList();
    }, [props.category, keyword]);

    // Add loadMore function
    const loadMore = async () => {
        if (loading || page >= totalPage) return;

        try {
            setLoading(true);
            let response = null;
            if (keyword === undefined) {
                const params = {
                    page: page + 1
                };
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params});
                }
            } else {
                const params = {
                    page: page + 1,
                    query: keyword
                }
                response = await tmdbApi.search(props.category, {params});
            }
            setItems(prev => [...prev, ...response.results]);
            setPage(page + 1);
        } catch (error) {
            console.log('Error loading more:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add intersection observer
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 0.5
        };

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMore();
            }
        }, options);

        if (lastMovieElementRef.current) {
            observer.current.observe(lastMovieElementRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, page, totalPage]);

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movie-grid">
                {items.map((item, i) => {
                    if (items.length === i + 1) {
                        // Add ref to last element
                        return (
                            <div ref={lastMovieElementRef} key={i}>
                                <MovieCard category={props.category} item={item} />
                            </div>
                        );
                    } else {
                        return (
                            <MovieCard category={props.category} item={item} key={i}/>
                        );
                    }
                })}
            </div>
            {loading && (
                <>
                    <div className="loading-more">
                        <div className="movie-grid">
                            {[...Array(4)].map((_, index) => (
                                <Skeleton key={`loading-more-${index}`} />
                            ))}
                        </div>
                    </div>
                    {/* <div className="loading">
                        Loading...
                    </div> */}
                </>
            )}
        </>
    );
}

const MovieSearch = props => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, navigate]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;