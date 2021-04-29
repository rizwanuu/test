import React, { useState, useRef, useEffect } from 'react';
import { ServerCallings } from '../../utils/ServerCallings';
import { Row, Col, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";

import redHeart from '../../assets/icons/red-heart.png'
import bed from '../../assets/icons/bed.png'
import bath from '../../assets/icons/bath.png'

export const Recentviewed = () => {
  const [properties, setProperties] = useState([])
  const [loader, setLoader] = useState(true)
  const videoRef = useRef();

  useEffect(() => {
    let userId = localStorage.getItem("id")
    ServerCallings.adminrecentviewed(userId, (data) => {
      if (data) {
        console.log(data)
        setProperties(data)
        setLoader(false)
        // console.log(properties)
      }
    })
    setLoader(true)
  }, [])



  const goToDetailPage = (property) => {
    localStorage.setItem('property', JSON.stringify(property));
    // window.location.reload(false)
  }

  return (
    <div className='favorits'>
      {
        // properties.length === 0 ? <p style={{ padding: "10px" }}>you do'nt add Favorites</p> :
        loader ? <p style={{ padding: "10px" }}>Loading....</p> : properties.map((property, index) => {
          return (
            <Col lg={4} md={4} sm={4} xs={12} key={index} style={{ paddingBottom: "20px" }}>
              {
                <div
                  className="box"
                >
                  <div className="heart">
                    <button>
                      <img src={redHeart} alt={"heartImage"} />
                    </button>
                  </div>
                  <Carousel className="img3">
                    {
                      property.fields.image_or_video?.split(',').map((item, index) => {
                        let ext = item.split('.').pop()
                        if (ext === 'jpeg' || ext === 'jpg' || ext === 'png') {
                          return <Carousel.Item key={index}>
                            <img className="itemimg" src={item} alt="i" />
                            <button className="now">New</button>
                          </Carousel.Item>
                        } else {
                          if (ext === "mp4") {
                            return (
                              <Carousel.Item key={index}>
                                <video className="itemimg" ref={videoRef} autoPlay loop muted>
                                  <source src={item} type="video/mp4" /> Your browser does not support HTML video. </video>
                              </Carousel.Item>
                            );
                          }
                        }
                        return null;
                      })
                    }
                  </Carousel>
                  <Link to={'/feature/' + property.pk} onClick={() => goToDetailPage(property)}>
                    <div className="details">
                      <div className="detail">
                        <span className="amount">${property.fields.price}</span>
                        <span className="bed">
                          <img src={bed} alt="bed" width="22.92" height="12.82" />
                          <span>{property.fields.beds} Bed</span>
                        </span>
                        <span className="bath">
                          <img src={bath} alt="bed" width="18.06" height="14.57" />
                          <span>{property.fields.baths} Bath</span>
                        </span>
                      </div>
                      <p className="address">{property.fields.home_address.split(",", 2)}</p>
                    </div>
                  </Link>
                </div>
              }

            </Col>
          )
          return null;
        })
      }
    </div>
  );
};

export const Favorites = () => {
  const [properties, setProperties] = useState([])
  const [loader, setLoader] = useState(true)
  const videoRef = useRef();

  useEffect(() => {
    let userId = localStorage.getItem("id")
    ServerCallings.adminfavourits(userId, (data) => {
      if (data) {
        setProperties(data)
        setLoader(false)
        // console.log(properties)
      }
    })
    setLoader(true)
  }, [])

  const goToDetailPage = (property) => {
    localStorage.setItem('property', JSON.stringify(property));
    // window.location.reload(false)
  }


  return (
    <div className='favorits'>
      {
        // properties.length === 0 ? <p style={{ padding: "10px" }}>you do'nt add Favorites</p> :
        loader ? <p style={{ padding: "10px" }}>Loading....</p> : properties.map((property, index) => {
          return (
            <Col lg={4} md={4} sm={4} xs={12} key={index} style={{ paddingBottom: "20px" }}>
              {
                <div
                  className="box"
                >
                  <div className="heart">
                    <button>
                      <img src={redHeart} alt={"heartImage"} />
                    </button>
                  </div>
                  <Carousel className="img3">
                    {
                      property.fields.image_or_video?.split(',').map((item, index) => {
                        let ext = item.split('.').pop()
                        if (ext === 'jpeg' || ext === 'jpg' || ext === 'png') {
                          return <Carousel.Item key={index}>
                            <img className="itemimg" src={item} alt="i" />
                            <button className="now">New</button>
                          </Carousel.Item>
                        } else {
                          if (ext === "mp4") {
                            return (
                              <Carousel.Item key={index}>
                                <video className="itemimg" ref={videoRef} autoPlay loop muted>
                                  <source src={item} type="video/mp4" /> Your browser does not support HTML video. </video>
                              </Carousel.Item>
                            );
                          }
                        }
                        return null;
                      })
                    }
                  </Carousel>
                  <Link to={'/feature/' + property.pk} onClick={() => goToDetailPage(property)}>
                    <div className="details">
                      <div className="detail">
                        <span className="amount">${property.fields.price}</span>
                        <span className="bed">
                          <img src={bed} alt="bed" width="22.92" height="12.82" />
                          <span>{property.fields.beds} Bed</span>
                        </span>
                        <span className="bath">
                          <img src={bath} alt="bed" width="18.06" height="14.57" />
                          <span>{property.fields.baths} Bath</span>
                        </span>
                      </div>
                      <p className="address">{property.fields.home_address.split(",", 2)}</p>
                    </div>
                  </Link>
                </div>
              }

            </Col>
          )
          return null;
        })
      }
    </div>
  );
};
