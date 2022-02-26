import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import HomeBanner from './components/HomeBanner';
import HomePage from './pages/HomePage';

import LoginPage from './pages/LoginPage';


import {Routes, Route} from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useContext, useEffect, useState } from 'react';
import { SetIsSignedIn, SET_ISSIGNEDIN } from './store/Actions';
import Contex from './store/Context';
import user_icon from './imgage/userIcon.jpg'
// Configure Firebase.
const config = {
  apiKey: 'AIzaSyDAEHARU259_dWmmjVoSUPWf7yKqf70PEY',
  authDomain: 'food-app-react-b7a63.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);

function App() {

  const {state, depatch} = useContext(Contex)
  //detructering...
  const {totalProduct, totalPrice, cart, isSignedIn} = state
  console.log(isSignedIn);
 
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
  
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
     
     
      if(!user){
        //user log out, handle
        console.log('not login');
        depatch(SetIsSignedIn(false))
        document.querySelector('.img_account').src = user_icon
      }
      else{ 
        depatch(SetIsSignedIn(true))
        console.log("login");
        //update name user in header
        const header_userName = document.querySelector('.account_name')
        header_userName.innerHTML = user.displayName
         document.querySelector('.img_account').src = user.photoURL
       // console.log("login : ", user);
      }

    });


    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


  return (
    <div className="App">
       <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                    />
               

            </Routes>
     
        
    </div>
  );
}

export default App;
