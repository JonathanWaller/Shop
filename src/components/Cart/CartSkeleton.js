import React from 'react';

import Skeleton from 'react-loading-skeleton';

import './Cart.css';

const CartSkeleton = () => {
    return(
        <div>
            <div className='cart_wrapper'>
                <div className='cart_leftPanel'>
                    <div className='cart_cartItems'>
                        <div className='cart_listItem'>
                        <Skeleton width={250} height={150} />
                        </div>
                    </div>
                </div>
            
                <div className='cart_rightPanel'>
                    <Skeleton width={150} height={200} />
                </div>
            </div>
        </div>
    )
};

export default CartSkeleton;