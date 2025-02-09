import React from 'react'
import Header from '../components/Header';
import notFound from "../images/404notfound.svg";
import "./NotFound.css"
function NotFound() {
  return (
    <>
    <Header />
    <div className='notfound-div'>
        <img src={notFound} className="notFound-image" alt="Not Found 404"/>
    </div>
    </>
  )
}

export default NotFound;
