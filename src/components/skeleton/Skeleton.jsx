import React from 'react';
import './skeleton.scss';

const Skeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton__poster"></div>
            <div className="skeleton__text">
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );
}

export default Skeleton;
