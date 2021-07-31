import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const HomeCarousel = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    swipeToSlide: true,
    slideToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <Link to="/category/product/amazon-alexa">
          <img src="/images/amazon_alex_carousel.jpg" alt="amazon_alexa" />
        </Link>
      </Wrap>
      <Wrap>
        <Link to="product/redmi-note-10-pro-max">
          <img
            src="/images/redmi_note_10_pro_max/carousel.jpg"
            alt="redmi-note-10-pro-max"
          />
        </Link>
      </Wrap> 
      <Wrap>
        <Link to="product/oneplus-watch-midnight-black">
          <img src="/images/oneplus_watch/carousel.jpg" alt="oneplus-watch" />
        </Link>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  margin-top: 4rem;
  width: 100%;
  & > button {
    opacity: 1;
    height: 100%;
    width: 8vw;
    z-index: 1;
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  .slick-prev {
    left: 0vw;
    top: 10vw;
  }
  .slick-next {
    right: 0vw;
    top: 10vw;
  }
  .slick-next:before {
    font-size: 3rem;
  }
  .slick-prev:before {
    font-size: 3rem;
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: #000;
    }
  }

  .slick-dots {
    top: 18vw;
  }

  li.slick-active button:before {
    color: white !important;
  }

  @media only screen and (max-width: 1048px) {
    .slick-next:before {
      font-size: 2rem;
    }
    .slick-prev:before {
      font-size: 2rem;
    }
  }
  @media only screen and (max-width: 768px) {
    .slick-next:before {
      display: none;
    }
    .slick-prev:before {
      display: none;
    }
  }
`;

const Wrap = styled.div`
  position: relative;
  cursor: pointer;

  a {
    cursor: pointer;
    position: relative;
    display: block;

    img {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      z-index: -1;
      mask-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.5)
      ) !important;
    }
  }
`;

export default HomeCarousel;
