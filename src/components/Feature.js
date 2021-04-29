import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import googleMapStyles from "../components/googleMap/submitStyle";
import ShowOfferModel from "./modals/submitOfferModel"

// import { TimePicker } from "antd";
import "antd/dist/antd.css";
// import { Launcher } from "react-chat-window";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import a from '../assets/images/a.png';
// import b from '../assets/images/b.png';
// import c from '../assets/images/c.png';
// import d from '../assets/images/d.png';
// import e from '../assets/images/e.png';
// import f from "../assets/images/f.png";
// import g from "../assets/images/g.png";
// import h from "../assets/images/h.png";

// import v from '../assets/video/v1.mp4';

import bed from "../assets/icons/bed.png";
import sqf from "../assets/icons/sqf.png";
import lot1 from "../assets/icons/lot.png";
import bath from "../assets/icons/bath.png";
import crime from "../assets/icons/crime.png";
import noise from "../assets/icons/noise.png";
import school1 from "../assets/icons/school.png";
import livabililty from "../assets/icons/livabililty.png";

import ac from "../assets/icons/ac.png";
import pool from "../assets/icons/pool.png";
import alarm from "../assets/icons/alarm.png";
import parking from "../assets/icons/parking.png";
import laundry from "../assets/icons/laundry.png";
import intercom from "../assets/icons/intercom.png";
import fireplace from "../assets/icons/fireplace.png";
import transport from "../assets/icons/transport.png";
import electricity from "../assets/icons/electricity.png";
import watersupply from "../assets/icons/watersupply.png";

// import play from "../assets/icons/play.png";
// import voice from "../assets/icons/voice.png";
import heart from "../assets/icons/heart.png";
import redHeart from '../assets/icons/red-heart.png';
// import share from '../assets/icons/share.png';

import chart from "../assets/images/chart.png";
// import location from '../assets/images/location.png';

import bgPattern from "./../assets/images/bg-pattern.png";
// import axios from "axios";
// import { frontend_server, backend_server } from "../globals";
// import i from "../assets/images/i.png";
import { ServerCallings } from "../utils/ServerCallings";
// import DatePicker from "react-multi-date-picker";
// import TimePicker from 'react-bootstrap-time-picker';
import Subfeature from "./Subfeature";
import Chat from "./chatApp/chat";

class Feature extends React.Component {
  constructor() {
    super();

    this.state = {
      propertyItem: JSON.parse(localStorage.getItem('property')),
      propertiesList: [],
      id: "",
      image_or_video: "",
      price: "",
      est_payment: "",
      home_address: "",
      location_long: "",
      location_lat: "",
      community: "",
      commute_drive_time: "",
      beds: "",
      baths: "",
      property_detail: "",
      area: "",
      stories: "",
      interest: "",
      tax: "",
      HOA: "",
      insurance: "",
      mortgage_insurance: "",
      noise_level: "",
      property_type: "",
      lot: "",
      nearby_schools: "",
      new_construction: "",
      have_garage: "",
      have_pool: "",
      have_basement: "",
      accessible: "",
      dates: "",
      date: "",
      time: "",
      errorMessage: "",
      FloorCovering: [],
      propertyFeature: true,
      propertyHistory: true,
      propertyTaxes: true,
      neighbourhood: true,
      mortgageInsurance: true,
      school: true,
      surrounding: true,

      lat: localStorage.getItem("lat"),
      lng: localStorage.getItem("lng"),
      itemId: null,
      calender: [],
      sceduleTime: '',
      sceduleDate: '',
      sceduleDay: '',
      messageList: [],
      showOffer: false,

      isOpen: false,
      changeColor: [],
    };
    this.refDate = React.createRef();
    this.refTime = React.createRef();
    this.videoRef = React.createRef();
    // this.getOneProperty = this.getOneProperty.bind(this);
    this.handleMultipleDates = this.handleMultipleDates.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    // this.getOneProperty();
    // this.videoRef.current.addEventListener('loadedmetadata', this.initializeVideo);
    // this.videoRef.current.addEventListener('timeupdate', this.updateTimeElapsed);

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var firstOne = firstDay.getDate();

    var lastOne = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    let temp = [];
    var get = -1;
    var k = 0;
    for (var i = firstOne; i <= lastOne; i++) {
      var d = new Date();

      k = k + 1;
      var dayNames = new Date(d.getFullYear(), d.getMonth(), k);
      var dayName = dayNames.toString().slice(0, 3);
      get = get + 1;
      let date = firstOne + get;
      temp.push({ date: date, dayName: dayName });
    }

    this.setState({ calender: temp });

    let model;
    ServerCallings.getProperties(model, (data) => {
      if (data) {
        this.setState({ propertiesList: data })
        // console.log(this.state.propertiesList)
      }
    })
    localStorage.setItem("propertyOwnerId", this.state.propertyItem.fields.user)
    localStorage.setItem("propertyOwnerName", this.state.propertyItem.fields.user_name)
    let body = {
      id: localStorage.getItem("id")
    }

    ServerCallings.sendrecentviewed(body, this.state.propertyItem.pk, (data) => {
      if (data) {
        // console.log(data)
      }
    })
  }

  // getOneProperty() {

  //   ServerCallings.getOneProperty(this.props.match.params.id, (data) => {
  //     if (data) {
  //       this.setState({ propertyItem: data[0] });
  //     }
  //   });
  // }

  formatTime = (timeInSeconds) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  };

  initializeVideo = () => {
    // const videoDuration = Math.round(this.videoRef.current.duration);
    // const time = this.formatTime(videoDuration);
    //
    // this.setState({videoDuration: `${time.minutes}:${time.seconds}`})
  };

  updateTimeElapsed = () => {
    const time = this.formatTime(Math.round(this.videoRef.current.currentTime));

    this.setState({ videoCurrentime: `${time.minutes}:${time.seconds}` });
  };

  handleTimeChange(time) {
    this.setState({ time: time });
  }
  handleMultipleDates(event) {
    let newDate = event.day + "/" + event.month.number + "/" + event.year;
    this.setState({ dates: newDate });

    // this.setState({dates: []})
    // let temp = [];
    // for(let i =0; i< event.length; i++){

    //      temp.push(newDate);
    // }
    // console.log(temp)
    // this.setState({date:event, dates: temp})
  }
  playPause = () => {
    if (this.videoRef.current.paused || this.videoRef.current.ended) {
      this.videoRef.current.play();
    } else {
      this.videoRef.current.pause();
    }
  };

  muteUnmute = () => {
    this.videoRef.current.muted = !this.videoRef.current.muted;
  };

  // _onMessageWasSent(message) {
  //   this.setState({
  //     messageList: [...this.state.messageList, message],
  //   });
    
  // }

  // _sendMessage(text) {
  //   if (text.length > 0) {
  //     this.setState({
  //       messageList: [
  //         ...this.state.messageList,
  //         {
  //           author: "them",
  //           type: "text",
  //           data: { text },
  //         },
  //       ],
  //     });
  //   }
  // }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };
  handleScedule = () => {
    let body = {
      property_id: parseInt(this.state.propertyItem.pk),
      date: this.state.sceduleDate,
      time: this.state.sceduleTime,
    };
    ServerCallings.postTour(body, (data) => {
      // console.log(data)
      if (data) {
        this.setState({ errorMessage: "Tour Submitted Successfully!" });
        setTimeout(() => this.setState({ errorMessage: "" }), 4000);
        // console.log(data);
      } else {
        this.setState({ errorMessage: "Somthing went wrong" });
        setTimeout(() => this.setState({ errorMessage: "" }), 4000);
        console.log("error");
      }
    });

  }
  changeImage = (e) => {
    if (e.target.src === heart) {
      e.target.src = redHeart
    }
    else {
      e.target.src = heart
    }
  }

  actionHandler() {
    this.setState({ showOffer: false })
  }
  render() {
    var select_image_or_video = 0;
    var check1 = 0;
    var check2 = 1;
    const {
      calender,
      tax,
      mortgage_insurance,
      FloorCovering,
      Parking,
      appliances,
      basement,
      OUTDOOR,
      HeatingType,
      propertyFeature,
      propertyHistory,
      propertyTaxes,
      neighbourhood,
      school,
      surrounding,
      propertyItem,
      propertiesList,
      showOffer
    } = this.state;

    propertyItem.fields.image_or_video.split(",").map((item) => {
      let ext = item.split(".").pop();
      if (ext === "mp4") { select_image_or_video = 1 }
    })

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 5,
    };


    return (
      <div className="feature bgHeaderPattern">
        <img src={bgPattern} alt="bgPattern" className="bgPattern" />
        <div className="images">
          <Row>
            <Col lg={3} md={3} sm={12} xs={12}>
              <Row>
                <Col>
                  {propertyItem.fields.image_or_video.split(",").map((item) => {
                    let ext = item.split(".").pop();
                    if (check1 < 2) {
                      if (ext === "jpeg" || ext === "jpg" || ext === "png") {
                        check1 = check1 + 1;
                        return (
                          <img src={item} alt="c" className={"img" + check1} />
                        );
                      }
                    }
                    return null;
                  })}
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Carousel className="img3">
                {propertyItem.fields.image_or_video.split(",").map((item) => {
                  let ext = item.split(".").pop();
                  if (ext === "mp4") {
                    return (
                      <Carousel.Item>
                        <video ref={this.videoRef} autoPlay loop muted>
                          <source src={item} type="video/mp4" />
                          Your browser does not support HTML video.
                        </video>
                      </Carousel.Item>
                    );
                  } else if (select_image_or_video === 0) {
                    if (ext === "jpeg" || ext === "jpg" || ext === "png") {
                      return (
                        <Carousel.Item>
                          <img src={item} alt="c" className={"img" + check2} />
                        </Carousel.Item>
                      );
                    }
                  }
                  return null;
                })}
              </Carousel>
            </Col>
            <Col lg={3} md={3} sm={12} xs={12}>
              <Row>
                <Col>
                  {propertyItem.fields.image_or_video.split(",").map((item) => {
                    let ext = item.split(".").pop();
                    check2 = check2 + 1;
                    if (check2 >= 4 && check2 < 6) {
                      if (ext === "jpeg" || ext === "jpg" || ext === "png") {
                        return (
                          <img src={item} alt="c" className={"img" + check2} />
                        );
                      }
                    }
                    return null;
                  })}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Container>
          <Row className="features">
            <Col lg={6} md={6} sm={12} xs={12}>
              <h3>
                {propertyItem.fields.home_address}
              </h3>
              <Row className="details">
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={bed} alt="bed" width="40.88" height="22.87" />
                    <p>{propertyItem.fields.beds} Bed</p>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={bath} alt="bed" width="32.21" height="25.99" />
                    <p>{propertyItem.fields.baths} Bath</p>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={sqf} alt="bed" width="22.31" height="17.35" />
                    <p>{propertyItem.fields.area} sqf</p>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={lot1} alt="bed" width="22.72" height="18.59" />
                    <p>{propertyItem.fields.lot} lot</p>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img
                      src={livabililty}
                      alt="bed"
                      width="24.33"
                      height="24.33"
                    />
                    <span className="small">
                      <i className="fa fa-star"></i>4.5
                    </span>
                    <span>Livability</span>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={school1} alt="" width="22.98" height="22.95" />
                    <span className="small">
                      <i className="fa fa-star"></i>4.5
                    </span>
                    <span>School </span>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={crime} alt="bed" width="29.74" height="24.4" />
                    <span className="small">
                      <i className="fa fa-star"></i>4.5
                    </span>
                    <span>Crime</span>
                  </div>
                </Col>
                <Col lg={3} md={4} sm={4} xs={4}>
                  <div>
                    <img src={noise} alt="bed" width="28.39" height="28.39" />
                    <span className="small">
                      <i className="fa fa-star"></i>4.5
                    </span>
                    <span>Noise</span>
                  </div>
                </Col>
              </Row>
              <h5 className="mb-2">Details</h5>
              <p>{propertyItem.fields.property_detail}</p>
              <hr />
              <h5>Apertment Features</h5>
              <Row className="apartment">
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img src={ac} alt="bed" width="36.04px" height="29.56px" />
                  <p>Air Conditioning</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img
                    src={transport}
                    alt="bed"
                    width="24.24px"
                    height="33.78px"
                  />
                  <p>Close to Transport</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img
                    src={electricity}
                    alt="bed"
                    width="33.78px"
                    height="33.78px"
                  />
                  <p>Electricity</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img src={alarm} alt="bed" width="35.9px" height="33.65px" />
                  <p>Alarm</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img
                    src={intercom}
                    alt="bed"
                    width="35.16px"
                    height="25.34px"
                  />
                  <p>Intercom</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img src={pool} alt="bed" width="31.9px" height="24.3px" />
                  <p>In-Ground Pool </p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img
                    src={parking}
                    alt="bed"
                    width="33.78px"
                    height="29.69px"
                  />
                  <p>Parking</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img
                    src={watersupply}
                    alt="bed"
                    width="31.16px"
                    height="28.11px"
                  />
                  <p>Water Supply</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img
                    src={laundry}
                    alt="bed"
                    width="25.51px"
                    height="31.02px"
                  />
                  <p>Laundry</p>
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                  <img src={fireplace} alt="bed" width="30px" height="30px" />
                  <p>Fire Place</p>
                </Col>
              </Row>
              <Row className="property feature">
                <Col>
                  <h5>Property Feature</h5>
                  <i
                    className={
                      "propertyFeature" ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    onClick={() =>
                      this.setState({ propertyFeature: !propertyFeature })
                    }
                  />
                </Col>
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  style={{ display: propertyFeature ? "block" : "none" }}
                >
                  <div>
                    <p>Price/Sq.Ft.</p>
                    <span>${propertyItem.fields.price}/Sq.Ft.</span>
                  </div>
                  <div>
                    <p>Baths</p>
                    <span>{propertyItem.fields.baths} Full, 1 parial</span>
                  </div>
                  <div>
                    <p>Stories</p>
                    <span>{propertyItem.fields.stories}</span>
                  </div>
                  <div>
                    <p>Property Type</p>
                    <span>{propertyItem.fields.property_type}</span>
                  </div>
                  <div>
                    <p>Community</p>
                    <span>{propertyItem.fields.community}</span>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row className="property history">
                <Col>
                  <h5>Property History</h5>
                  <i
                    className={
                      "propertyHistory" ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    onClick={() =>
                      this.setState({ propertyHistory: !propertyHistory })
                    }
                  />
                </Col>
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  style={{ display: propertyHistory ? "block" : "none" }}
                >
                  <div className="box">
                    <div>
                      <span className="date">Jun 9, 2020</span>
                      <span className="status">Listed Active</span>
                    </div>
                    <h6>$565,630</h6>
                  </div>
                  <div className="box">
                    <div>
                      <span className="date">Apr 7, 2012</span>
                      <span className="status s">Sold</span>
                    </div>
                    <h6>$340,000</h6>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row className="property taxes">
                <Col>
                  <h5>Property Taxes</h5>
                  <i
                    className={tax ? "fa fa-angle-up" : "fa fa-angle-down"}
                    onClick={() =>
                      this.setState({ propertyTaxes: !propertyTaxes })
                    }
                  />
                </Col>
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  style={{ display: propertyTaxes ? "block" : "none" }}
                >
                  <div>
                    <span>Tax Amount</span>
                    <span className="colon">:</span>
                    <span className="amount">${propertyItem.fields.tax}</span>
                  </div>
                  <div>
                    <span>Land</span>
                    <span className="colon">:</span>
                    <span className="amount">$3,694,000</span>
                  </div>
                  <div>
                    <span>Improvements</span>
                    <span className="colon">:</span>
                    <span className="amount">$2,148,100</span>
                  </div>
                  <div>
                    <span>Total</span>
                    <span className="colon">:</span>
                    <span className="amount">$5,842,100</span>
                  </div>
                </Col>
              </Row>
              <hr />

              <Row
                className="property neighbourhood"
                style={{ marginBottom: "50px" }}
              >
                <Col>
                  <h5>Neighbourhood</h5>
                  <i
                    className={
                      neighbourhood ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    onClick={() =>
                      this.setState({ neighbourhood: !neighbourhood })
                    }
                  />
                </Col>
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  style={{ display: neighbourhood ? "block" : "none" }}
                >
                  <p>Charlotte Hall, MD</p>
                  <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <div>
                        <h5>$399k</h5>
                        <span>Median Price for sale</span>
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <div>
                        <h5>$150</h5>
                        <span>Median Price per sq.ft</span>
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <div>
                        <h5>48</h5>
                        <span>Median Price on Market</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {Parking !== null ? (
                <Subfeature title="Parking" value={Parking} />
              ) : (
                ""
              )}
              {appliances !== null ? (
                <Subfeature title="Appliances" value={appliances} />
              ) : (
                ""
              )}
              {basement !== null ? (
                <Subfeature title="Basement" value={basement} />
              ) : (
                ""
              )}
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="payment">
                <div className="dollarvalues">
                  <span className="dollarvalue">&#36;{propertyItem.fields.price}</span>
                  <span>
                    <button type="btn">For Sale</button>
                  </span>
                  <span className="listed">Listed 2 days ago</span>
                </div>
                <div className="para">
                  <p>{propertyItem.fields.home_address}</p>
                </div>
                <div className="getpre">
                  <span>
                    <button type="btn">Get pre-qualified</button>
                  </span>
                  <span className="estpayment">
                    Est. payment: <br />
                    <span className="simplefont">&#36;{propertyItem.fields.est_payment}/mo</span>
                  </span>
                </div>
              </div>

              <div className="buttonsstyles">
                <button id="send" onClick={() => this.handleClick()}>
                  Send message to seller
                </button>
                <button id="submit" onClick={() => this.setState({ showOffer: true })}>Submit an offer</button>
              </div>
              <ShowOfferModel
                showModel={showOffer}
                action={this.actionHandler}
                onHide={() => {
                  this.setState({ showOffer: false })
                }}
              />
              <div>
                <Chat />
                {/* <Launcher
                  agentProfile={{
                    teamName: "Chat for awesome experience",
                    imageUrl:
                      "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
                  }}
                  onMessageWasSent={this._onMessageWasSent.bind(this)}
                  messageList={this.state.messageList}
                  showEmoji={false}
                  isOpen={this.state.isOpen}
                  handleClick={() => this.handleClick()}
                /> */}
              </div>

              <div className="calendarsettings">
                <div>
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 2H17V0H15V2H5V0H3V2H2C0.9 2 0 2.9 0 4V20C0 21.1 0.9 22 2 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM18 20H2V7H18V20Z"
                      fill="#4F4F4F"
                    />
                  </svg>
                  <span className="scedule">Scedule a tour</span>
                </div>
                <div className="container makingborder m-0">
                  <Slider {...settings}>
                    {/* {console.log(calender)} */}
                    {calender.map((data, index) => (
                      <div key={index} className="col">
                        <button
                          className="calendar"
                          id={index}
                          onClick={(e) => {
                            e.target.style.backgroundColor = '#0042cc'
                            e.target.style.color = '#fff'
                            e.target.style.boxShadow = '0px 10px 30px #8899b2'
                            console.log(e.target.id)
                            this.setState({ sceduleDate: data.date, sceduleDay: data.dayName })
                          }
                          }
                        >
                          {data.date}
                          <br />
                          {data.dayName}
                          {/* <span>
                          </span> */}
                        </button>
                      </div>
                    ))}
                  </Slider>
                  <Col className="choosing">
                    {/* antd timepicker  */}
                    {/* <TimePicker
                      className="chooose"
                      placeholder=" Choose Time"
                      format={format}
                    /> */}
                    {/* <button id="choose">Choose Time */}
                    <input
                      type="time"
                      content="Choose Time"
                      id="choose"
                      value={this.state.sceduleTime}
                      onChange={(e) => this.setState({ sceduleTime: e.target.value })}
                    />
                    {/* </button> */}

                    {/* {console.log(this.state.timee)} */}
                    <button id="scedule" onClick={this.handleScedule}>Scedule a Tour</button>
                  </Col>
                  <div className="result" style={{ color: "red", marginLeft: "50%" }}>
                    {this.state.errorMessage}
                  </div>
                </div>
              </div>
              <hr />
              <Row className="property donutchart">
                <Col>
                  <h5>Monthly Mortgage</h5>
                  <i
                    className={
                      mortgage_insurance ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    onClick={() =>
                      this.setState({ mortgage_insurance: !mortgage_insurance })
                    }
                  />
                </Col>
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  style={{ display: mortgage_insurance ? "block" : "none" }}
                >
                  <div className="chart">
                    <img src={chart} alt="chart" />
                  </div>
                  <div className="donutchart">
                    <div className="principal">
                      <span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "blue" }}
                        ></span>
                        Principal & Interest
                      </span>
                      <span>&#36;{propertyItem.fields.interest}</span>
                    </div>
                    <div className="principal">
                      <span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "#3CD7E1" }}
                        ></span>
                        Property Taxes
                      </span>
                      <span>&#36;{propertyItem.fields.tax}</span>
                    </div>
                    <div className="principal">
                      <span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "#FECA7A" }}
                        ></span>
                        Home Insurance
                      </span>
                      <span>&#36;{propertyItem.fields.insurance}</span>
                    </div>
                    <div className="principal">
                      <span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "#F2994A" }}
                        ></span>
                        HOA
                      </span>
                      <span>&#36;{propertyItem.fields.HOA}</span>
                    </div>
                    <div className="principal">
                      <span>
                        <span
                          className="dot"
                          style={{ backgroundColor: "#C1DAFF" }}
                        ></span>
                        Mortgage Insurance
                      </span>
                      <span>&#36;{propertyItem.fields.mortgage_insurance}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row className="property location">
                <Col>
                  <h5>Property Location</h5>
                  <i
                    className={school ? "fa fa-angle-up" : "fa fa-angle-down"}
                    onClick={() => this.setState({ school: !school })}
                  />
                </Col>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ display: school ? "block" : "none" }}
                >
                  <Map
                    google={this.props.google}
                    zoom={17}
                    center={{
                      lat: this.state.propertyItem ? this.state.propertyItem.fields.location_lat : this.state.lat,
                      lng: this.state.propertyItem ? this.state.propertyItem.fields.location_long : this.state.lng,
                    }}
                    styles={this.props.Style}
                    className="submitmapimg"
                    gestureHandling={"greedy"}
                    minZoom={12}
                    maxZoom={17}
                  >
                    <Marker
                      position={{
                        lat: this.state.propertyItem ? this.state.propertyItem.fields.location_lat : this.state.lat,
                        lng: this.state.propertyItem ? this.state.propertyItem.fields.location_long : this.state.lng,
                      }}
                      name={"Property location"}
                    />
                  </Map>
                  <div className="address">
                    <div className="first">
                      <span id="one">Ps 183 Robert L Stevenson</span>
                      <span>0.1</span>
                    </div>
                    <div className="second">
                      <span>
                        Public<span className="public">Grades PK-5</span>
                      </span>
                      <span>mi</span>
                    </div>
                  </div>
                  <hr />
                  <div className="address">
                    <div className="first">
                      <span id="one">Ps 183 Robert L Stevenson</span>
                      <span>0.1</span>
                    </div>
                    <div className="second">
                      <span>
                        Public<span className="public">Grades PK-5</span>
                      </span>
                      <span>mi</span>
                    </div>
                  </div>
                  <hr />
                  <div className="address">
                    <div className="first">
                      <span id="one">Ps 183 Robert L Stevenson</span>
                      <span>0.1</span>
                    </div>
                    <div className="second">
                      <span>
                        Public<span className="public">Grades PK-5</span>
                      </span>
                      <span>mi</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row
                className="property surrounding"
                style={{ marginBottom: "50px" }}
              >
                <Col>
                  <h5>Surrounding</h5>
                  <i
                    className={
                      surrounding ? "fa fa-angle-up" : "fa fa-angle-down"
                    }
                    onClick={() => this.setState({ surrounding: !surrounding })}
                  ></i>
                </Col>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ display: surrounding ? "block" : "none" }}
                >
                  <div className="settingborder">
                    <div id="noice">noice</div>
                    <div id="na">
                      {propertyItem.fields.noise_level ? 'yes' : 'N / A'} Noise Level outside the property building at city
                    </div>
                  </div>
                </Col>
              </Row>
              {FloorCovering !== null ? (
                <Subfeature title="Floor Covering" value={FloorCovering} />
              ) : (
                ""
              )}
              {HeatingType !== null ? (
                <Subfeature title="Heating Type" value={HeatingType} />
              ) : (
                ""
              )}
              {OUTDOOR !== null ? (
                <Subfeature title="Outdoor" value={OUTDOOR} />
              ) : (
                ""
              )}
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <hr />
            </Col>
          </Row>
          <Row className="property similar">
            <Col lg={6} md={6} sm={12} xs={12}>
              <h5>Awesome Similar Homes</h5>
              {/* <i
                className={"similar" ? "fa fa-angle-up" : "fa fa-angle-down"}
                onClick={() => this.setState({ similar: !"similar" })}
              ></i> */}
            </Col>
            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{ display: "similar" ? "block" : "none" }}
            >
              <Row>
                {
                  propertiesList.map((item, index) => {
                    if (item.fields.price <= propertyItem.fields.price && index <= 2) {
                      return (
                        <Col lg={4} md={6} sm={12} xs={12}>
                          <div
                            className="box"
                          >
                            <Carousel className="img3">
                              {
                                item.fields.image_or_video?.split(',').map((item, index) => {
                                  let ext = item.split('.').pop()
                                  if (ext === 'jpeg' || ext === 'jpg' || ext === 'png') {
                                    return <Carousel.Item key={index}>
                                      <img className="itemimg" src={item} alt="i" />
                                      <button className="now">New</button>
                                      <div className="heart">
                                        <button>
                                          <img src={heart} onClick={this.changeImage} alt="heart" />
                                        </button>
                                      </div>
                                      {/* <button className="play">
                                            <img src={play} alt="play" />
                                        </button>
                                        <div className="voice-and-time">
                                            <p>1:48</p>
                                            <button>
                                                <img src={voice} alt="voice" />
                                            </button>
                                        </div> */}
                                    </Carousel.Item>
                                  }
                                  return null;
                                })
                              }
                            </Carousel>
                            <Link to={'/feature/' + item.pk} onClick={() => {
                              localStorage.setItem('property', JSON.stringify(item))
                              window.scrollTo(0, 0);
                            }}>
                              <div className="details">
                                <div className="detail">
                                  <span className="amount">${item.fields.price}</span>
                                  <span className="bed">
                                    <img src={bed} alt="bed" width="22.92" height="12.82" />
                                    <span>{item.fields.beds} Bed</span>
                                  </span>
                                  <span className="bath">
                                    <img src={bath} alt="bed" width="18.06" height="14.57" />
                                    <span>{item.fields.baths} Bath</span>
                                  </span>
                                </div>
                                <p className="address">{item.fields.home_address}</p>
                              </div>
                            </Link>
                          </div>
                        </Col>
                      )
                    }
                    return null
                  })
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Feature.defaultProps = googleMapStyles;
export default GoogleApiWrapper({
  apiKey: "AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE",
})(Feature);
