import React from "react";
import Navbar from "./Navbar";
import ImageGallery from 'react-image-gallery';
import CardComponent from "./Card";
// import blog from "../assets/blog.png";
// import black from "../assets/black.png";
import glass from "../assets/glass.png";
// import {CardGroup} from "reactstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

const MainApp = () => {
    const images = [
        // {
        //   original: blog
        //   // original: 'https://picsum.photos/id/1018/800/400/',
        //   // thumbnail: 'https://picsum.photos/id/1018/250/150/',
        // },
        {
          original: glass
          // original: 'https://picsum.photos/id/1015/800/600/',
          // thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        // {
        //   original: black
        //   // original: 'https://picsum.photos/id/1019/800/600/',
        //   // thumbnail: 'https://picsum.photos/id/1019/250/150/',
        // },
      ];
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        showFullscreenButton:false,
        showNav: false,
        showThumbnails: false,
        showPlayButton: false,
        autoPlay:true
      };
    
  return (
    <div>
        <Navbar />
        <ImageGallery {...settings} items={images}/>
        <br/>
        <br/>
        <CardComponent />
    </div>
  );
}

export default MainApp;
