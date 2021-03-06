import '../styles/HeaderStyle.scss'
import logo from '../imgage/logo.svg'
import user_icon from '../imgage/userIcon.jpg'
import './Header.scss'

import { AiOutlineHome } from 'react-icons/ai';
import { FaRegNewspaper,FaBars } from 'react-icons/fa';
import { IoStorefrontOutline } from 'react-icons/io5';
import { GiKnifeFork } from 'react-icons/gi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { nav } from '../data/data';
import { useContext, useEffect } from 'react';
import Contex from '../store/Context';
import BtnScroll from './BtnScroll';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";
import { SetDialogShow } from '../store/Actions';
const Header = () =>{

    const {state, depatch} = useContext(Contex)
    //detructering...
    const {totalProduct, totalPrice, cart, isSignedIn} = state


    //add scrool event in DOM
   useEffect( () =>{
    const handScroll =() =>{
        const header = document.querySelector('.header')
        const btnSroll = document.querySelector('.btn-scroll')
       // console.log(window.scrollY);
        if(window.scrollY > 50){
                 header.classList.add('color_black')
               
        }
        else{
            header.classList.remove('color_black')
        }
        //show Btn-scroll
        if(window.scrollY > 100){
            btnSroll.classList.add('active-btnScrool')
        }
        else{
            btnSroll.classList.remove('active-btnScrool')
        }
    }
    window.addEventListener('scroll', handScroll)

    //cleanup function
    return () =>{
        window.removeEventListener('scroll', handScroll)
    }
   }, [])

   

   const handleOpenCart = () =>{
       //nếu đã đăng nhập tài khoản thì active cart
       if(isSignedIn){
           const cartDetail = document.querySelector('.cartDetails')
           const cartOverlay = document.querySelector('.cart_overlay')
           cartOverlay.classList.add('active_cartOverlay')
           cartDetail.classList.add('active_cartDetails')
       }
       else{
           //thông báo phải login mới thực hiện được chức năng( dialogshow)
            depatch(SetDialogShow(true))
       }
   }

   //login account
   const logout = () =>{
       
       firebase.auth().signOut().then(()=> {
            console.log('logged out')
        }).catch((error) => {
            console.log(error.message)
        })
   }
    return (
        <header className='header'>
            <div className='container'>
                <div className='bar'>
                    <FaBars />
                </div>
                <div className='header_left'>
                   <Link to="/"> <img src={logo} /></Link>
                    <nav>
                        <ul>
                            {
                                nav.map(val =>{
                                    return <li><span>{val.icon}</span><a>{val.text}</a></li>
                                })
                            }
                            {/* <li><span><AiOutlineHome /></span><a>pages</a></li>
                            <li><span><GiKnifeFork /></span> <a>Order online</a></li>
                            <li><span><FaRegNewspaper /></span><a>news</a></li>
                            <li><span><IoStorefrontOutline /></span>  <a>Store locations</a></li> */}
                        </ul>
                    </nav>
                </div>
                <div className='header_right'>
                    <div className='cart'
                        onClick={() => handleOpenCart()}
                    >
                        <span> <HiOutlineShoppingCart /></span>
                        <span className='cart_number'>{totalProduct}</span>
                    </div>
                    <div className='account'>
                            
                              {
                                  !isSignedIn ? (
                                    <Link to="login" className='account'>
                                        <div className='account_icon'>
                                          <img className='img_account' src={user_icon} />
                                        </div>
                                        <span className='account_name' >sign in</span>
                                     </Link>
                                  ):
                                  (
                                    <div to="login" className='account'>
                                        <div className='account_icon'>
                                         <img className='img_account' src={user_icon} />
                                        </div>
                                        <span className='account_name' >sign inok</span>
                                   </div>
                                  )

                              }
                       {
                           isSignedIn ? (
                            <div className='account_option'>
                                <ul>
                                    <li><span><AiOutlineHome /></span><a>my account</a></li>
                                    <li><span><AiOutlineHome /></span><a>my wishlist</a></li>
                                    <li onClick={() => logout()}><span><AiOutlineHome /></span><a>log out</a></li>
                                </ul>
                             </div>
                           ):
                           null

                       }
                    </div>
                </div>
            </div>
            
        </header>
    )
}

export default Header