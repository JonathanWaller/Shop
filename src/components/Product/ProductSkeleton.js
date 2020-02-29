import React from 'react';

import Skeleton from 'react-loading-skeleton';

import "./Product.css";

const ProductSkeleton = () => {
    return(
        <div>
            <div 
                className='product_leftPanel'
                style={{paddingTop: 50}}
            >
                <Skeleton  height={ 400 } width={350} />
            </div>
            <div 
                className='product_rightPanel'
                style={{paddingTop: 50}}
            >
                <Skeleton height={ 600 } width={300} />
            </div>
        </div>
    )
};

export default ProductSkeleton;