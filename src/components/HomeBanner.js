import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { banner } from '../data/data';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import './HomeBannerStyle.scss'

const HomeBanner  = () => {
    return (
        <Carousel className='banner'>
            {
                banner.map(val =>{
                    return (
                        <div key={val.id} className='banner_wrapper'>
                            <img src={val.img} />
                            <div className='wrapper_web'>
                                <div className='banner_content'>
                                    <p className="banner_text">{val.text}</p>
                                    <h2 className='banner_title'>{val.title}<br /><strong>{val.red}</strong></h2>
                                    <button className='btn_order btn'>  <span> <HiOutlineShoppingCart /></span>order now</button>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
          
        </Carousel>
    );
}

export default HomeBanner

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>