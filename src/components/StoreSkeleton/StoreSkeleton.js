import React from 'react';

import Skeleton from 'react-loading-skeleton';

import './StoreSkeleton.css';

const StoreSkeleton = () => {
    
    let storeLength=[1,2,3,4];
    let storeItems = storeLength.map( (item, index) => {
        return (
            <div
                className='store_productWrapper'
                key={index}
            >
                <Skeleton width={200} height={200} />
            </div>
        )
    })
    
    return(
        <div
            className='store_wrapper'
        >
            { storeItems }
        </div>
    )
};

export default StoreSkeleton;