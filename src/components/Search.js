import React from 'react';

import $ from "jquery";

import { Row, Col, Carousel } from 'react-bootstrap';
import {
    // Map,
    // InfoWindow,
    // Marker,
    GoogleApiWrapper
} from 'google-maps-react';

import googleMapStyles from "../components/googleMap/style";
// import blueCircle from '../assets/images/bluecircle.png';
// import oneHouse from '../assets/images/oneHouse.png';
// import largeCircle from '../assets/images/largeCircle.png';

import Geocode from "react-geocode";

import bed from '../assets/icons/bed.png';
import bath from '../assets/icons/bath.png';

import MapsGoogle from './googleMap/map'

import heart from '../assets/icons/heart.png';
import redHeart from '../assets/icons/red-heart.png';

import land from './../assets/icons/land.png';
import condo from './../assets/icons/condo.png';
import blackHouse from './../assets/icons/black-house.svg';
// import house1 from './../assets/icons/house1.png';
import townHouse from './../assets/icons/townHouse.png';
import otherHouse from './../assets/icons/otherHouse.png';
import multiFamily from './../assets/icons/multiFamily.png';
import checkCircle from './../assets/icons/checkCircle.png';

import search from '../assets/icons/search.png';
import location from '../assets/icons/location.png';
import arrowDown from './../assets/icons/arrowdown.png';
// import whiteArrowDown from './../assets/icons/whitearrowdown.png';
import graphIntersect from './../assets/images/graphIntersect.png';


import bgPattern from './../assets/images/bg-pattern.png';
// import axios from "axios";
// import { frontend_server, backend_server } from "../globals";
import { ServerCallings } from "../utils/ServerCallings";
import { Link } from "react-router-dom";
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            to: 1000,
            from: 0,
            bed: null,
            bath: null,
            home: 0,
            minSq: null,
            maxSq: null,
            school: 0,
            commute: 0,
            showBed: false,
            showBath: false,
            showRate: false,
            showMore: false,
            showType: false,
            commuteAddress: '',
            showCommute: false,
            showSquareFeet: false,
            beds: [0, 1, 2, 3, 4],
            baths: [0, 1, 2, 3, 4],
            homes: ["Newest", "Low to High", "High to Low"],
            schools: [1, 2, 3, 4, 5, 6],
            commutes: [0, 10, 20, 30, 40, 50, 60],
            name: "Eign",
            properties: [],
            property_type: "",
            lat: 0,
            lng: 0,
            address: '',
            searchResult: '',
            exe: false,
            stope1: false,
            newestHomes: [],
            lowToHigh: [],
            lowToHighIdArray: [],
            lowToHighHomes: [],

            highToLow: [],
            highToLowIdArray: [],
            highToLowHomes: [],

            currLat: null,
            currLng: null,

            commuteDriveFilteredProperties: [],
            propertyDatalist: [],
            show: [],

            mouseEnterId: null,
            filterFuncArray: [],
            zoomLevel: 7,
            loader: false,


        }
        this.getProperties = this.getProperties.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleCommuteAddress = this.handleCommuteAddress.bind(this)
        this.handleCommuteSelect = this.handleCommuteSelect.bind(this)
        this.filterFunc = this.filterFunc.bind(this)
        this.commuteFilter = this.commuteFilter.bind(this)
        this.distanceFunc = this.distanceFunc.bind(this)
    }

    componentDidMount() {
        if (this.props.history.location.state) {
            this.setState({ lat: this.props.history.location.state[0], lng: this.props.history.location.state[1] })
        } else {
            // this.setState({ lat: 43.4516395, lng: -80.4925337 })
            navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
                this.setState({ lat: lat, lng: lng })
            })
        }
        this.getProperties();
        var context = this;
        $(".js-range-slider").ionRangeSlider({ onChange: context.updateRange });

        ServerCallings.getProperties(this.model, (data) => {
            if (data) {
                this.setState({ propertyDatalist: data })
            }
        })
    }


    handleCommuteAddress = address => {
        this.setState({ commuteAddress: address })
    }
    handleCommuteSelect = address => {
        this.setState({ commuteAddress: address })
        // geocodeByAddress(address)
        //     .then(results => getLatLng(results[0]))
        //     .then(latLng => {
        //         this.setState({ lat: latLng.lat, lng: latLng.lng })
        //     })
        //     .catch(error => console.error('Error', error));
    }


    handlePlaceChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address: address })
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ currLat: latLng.lat, currLng: latLng.lng })
            })
            .catch(error => console.error('Error', error));
    };
    delta = (data) => {
        this.setState({
            properties: data
        });
    }

    currentLocation = () => {
        navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
            this.setState({ lat: lat, lng: lng })
        })
        // this.setState({ lat: localStorage.getItem('lat'), lng: localStorage.getItem('lng') })
    }
    handleClick = () => {
        this.setState({ lat: this.state.currLat, lng: this.state.currLng })
    }
    getProperties() {
        let model
        ServerCallings.getProperties(model, (data) => {
            // console.log(data)
            // if (data) {
            this.setState({ properties: data })
            this.setState({ loader: false })
            // console.log(this.state.properties)
            // }
        })
        this.setState({ loader: true })

    }

    updateRange = (data) => {
        this.setState({ to: data.to, from: data.from })
    }

    handleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        if (value.indexOf('-') !== -1) {

            value = value.replace('e', '');
            value = value.replace('E', '');
            value = value.replace('+', '');
            value = value.replace('-', '');
            value = value.replace(' sq', '');
        }

        if (!isNaN(value)) {
            this.setState({ [name]: value })

        }

    }

    TitleCase(txt) {
        return txt.replace(/\w\S*/g, txt.charAt(0).toUpperCase() + txt.substr(1));
    };

    setPropertyType = (e) => {
        $('.box5 div').removeClass('active').addClass('inactive');
        if (e.target.name) {
            this.setState({ property_type: this.TitleCase(e.target.name) });
            $('#' + this.TitleCase(e.target.name)).removeClass('inactive').addClass('active')
        } else {
            this.setState({ property_type: this.TitleCase(e.target.id) });
            $('#' + this.TitleCase(e.target.id)).removeClass('inactive').addClass('active')
        }

    }

    changeImage = (e) => {
        if (e.target.src === heart) {
            let userId = localStorage.getItem("id");
            let propertyId = parseInt(e.target.alt);
            let body = this.state.properties.filter(item => {
                if (item.pk === propertyId) {
                    return item
                }
            })

            if (userId === null) {
                alert("Please login first!")
            } else {
                e.target.src = redHeart
                ServerCallings.sendfavourits(body, userId, propertyId, (data) => {
                    // alert(data.status)
                })
            }
        }
        else {
            e.target.src = heart
        }
    }
    // MapLeave = () => {
    //     console.log("leave")
    //     this.setState({ mouseEnterId: null })
    // }
    MapUpdateOnHover = (id) => {
        this.setState({ mouseEnterId: id })
        // this.state.properties.map(property => {
        //     if (property.pk === id) {
        //         this.setState({ lat: property.location_lat, lng: property.location_long })
        //     }
        // })

    }

    commuteFilter = () => {
        let commu = this.state.commuteDriveFilteredProperties.filter((c, index) => {
            return this.state.commuteDriveFilteredProperties.indexOf(c) === index
        })
        this.setState({ filterFuncArray: commu })
        this.setState({ zoomLevel: this.state.zoomLevel === 7 ? this.state.zoomLevel + 1 : this.state.zoomLevel - 1 })
    }

    filterFunc = () => {
        let body = {
            beds: this.state.bed,
            baths: this.state.bath,
            property_type: this.state.property_type,
            area_max: this.state.maxSq,
            area_min: this.state.minSq
        }

        ServerCallings.list(body, (data) => {
            this.setState({ filterFuncArray: data })
            this.setState({ loader: false })
            this.setState({ zoomLevel: this.state.zoomLevel === 7 ? this.state.zoomLevel + 1 : this.state.zoomLevel - 1 })
        })
        this.setState({ loader: true })

    }


    distanceFunc = (commute) => {

        var distance = require('google-distance-matrix');
        distance.key('AIzaSyA-JsScxsfWGJvzHzPbGqkBIll34kyRMf0');
        distance.units('imperial');

        let latlngarray = [];
        this.state.propertyDatalist.forEach(property => {
            latlngarray.push(property.fields.location_lat + "," + property.fields.location_long)
        })

        // var origins = ["Kitchener, ON, Canada"]
        var origins = [this.state.commuteAddress];
        var destinations = latlngarray;


        console.log(commute)
        let { properties, commuteDriveFilteredProperties } = this.state

        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if (!distances) {
                return console.log('no distances');
            }

            if (distances.status === 'OK') {
                for (var i = 0; i < origins.length; i++) {

                    for (var j = 0; j < destinations.length; j++) {
                        var destination = distances.destination_addresses[j];

                        if (distances.rows[i].elements[j].status === 'OK') {
                            var duration = distances.rows[i].elements[j].duration.text;
                            var value = duration.split(" ")[0]
                            const locationInMins = distances.rows[i].elements[j].duration.text.split(' ')[1] === "mins" || distances.rows[i].elements[j].duration.text.split(' ')[1] === "min"

                            if (commute === 10 || commute === 20 || commute === 30 || commute === 40 || commute === 50 || commute === 60) {
                                if (value <= commute && locationInMins) {
                                    // console.log('Distance from ' + origins[i] + ' to ' + destination + ' is ' + value + "mins");
                                    geocodeByAddress(destination)
                                        .then(results => getLatLng(results[0]))
                                        .then(latLng => {
                                            // console.log(parseInt(property.location_lat).toFixed(1))
                                            properties.filter(property => {
                                                if (Math.round(latLng.lat) === Math.round(parseInt(property.fields.location_lat)) &&
                                                    Math.round(latLng.lng) === Math.round(parseInt(property.fields.location_long))) {
                                                    commuteDriveFilteredProperties.push(property);
                                                }
                                                return null
                                            })
                                        })
                                        .catch(error => console.error('Error', error));
                                }
                            } else {
                                geocodeByAddress(destination)
                                    .then(results => getLatLng(results[0]))
                                    .then(latLng => {
                                        properties.filter(property => {
                                            if (latLng.lat.toFixed(2) === parseInt(property.fields.location_lat).toFixed(2) &&
                                                latLng.lng.toFixed(2) === parseInt(property.fields.location_long).toFixed(2)) {
                                                commuteDriveFilteredProperties.push(property);
                                            }
                                            return null
                                        })
                                    })
                                    .catch(error => console.error('Error', error));
                            }

                        }
                        else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }

        });
    }


    changeValue = (e) => {

        if (e.target.value === this.state.homes[0]) {

            ServerCallings.newst(this.model, (data) => {
                this.setState({ filterFuncArray: data })
                this.setState({ loader: false })
                this.setState({ zoomLevel: this.state.zoomLevel === 7 ? this.state.zoomLevel + 1 : this.state.zoomLevel - 1 })
            })
            this.setState({ loader: true })

        }

        if (e.target.value === this.state.homes[1]) {
            let body
            ServerCallings.lowtohigh(body, (data) => {
                this.setState({ filterFuncArray: data })
                this.setState({ loader: false })
                this.setState({ zoomLevel: this.state.zoomLevel === 7 ? this.state.zoomLevel + 1 : this.state.zoomLevel - 1 })
            })
            this.setState({ loader: true })
        }

        if (e.target.value === this.state.homes[2]) {
            let body
            ServerCallings.hightolow(body, (data) => {
                this.setState({ filterFuncArray: data })
                this.setState({ loader: false })
                this.setState({ zoomLevel: this.state.zoomLevel === 7 ? this.state.zoomLevel + 1 : this.state.zoomLevel - 1 })
            })
            this.setState({ loader: true })
        }

    }
    handleCallback = (childData) => {
        // console.log(childData)
        this.setState({ properties: childData })
    }
    render() {
        var propertiesList
        const searchOptions = {
            componentRestrictions: { country: ['ca'] }
        }

        const {
            to, from, beds, baths, home, homes, minSq, maxSq, commutes, school, schools, commuteAddress,
            showBed, showBath, showRate, showMore, showType, showCommute, showSquareFeet, stope1,
            mouseEnterId, filterFuncArray, zoomLevel, loader, properties
        } = this.state;


        Geocode.setApiKey("AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE");
        if (stope1 === false) {
            Geocode.fromLatLng(this.state.lat, this.state.lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    var value = address.split(",");
                    var count = value.length;
                    // var country = value[count - 1];
                    var state = value[count - 2];
                    var city = value[count - 3];
                    var mainAddress = city + ", " + state;
                    // console.log(city)
                    this.setState({ searchResult: mainAddress })
                    this.setState({ stope1: true })
                },
                (error) => {
                    console.error(error);
                }
            );

        }


        // < script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE&map_ids=b27e6dd66233d0b0&libraries=places" ></script >
        const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
            <div className="autocomplete-root">
                <input
                    {...getInputProps()}
                    placeholder={this.state.searchResult}
                />
                <div className="autocomplete-dropdown-container">
                    {suggestions.map(suggestion => (
                        <div {...getSuggestionItemProps(suggestion)}>
                            <span>{suggestion.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        );

        propertiesList = loader ? <>Loading...</> : properties.map((property, index) => {
            if (properties.length > 0) {
                return (
                    <Col lg={6} md={6} sm={6} xs={12} key={index}>
                        {
                            <div
                                className="box"
                                onMouseEnter={() => this.MapUpdateOnHover(property.pk)}
                            // onMouseLeave={() => this.MapLeave()}
                            >
                                <div className="heart">
                                    <button>
                                        <img src={heart} onClick={this.changeImage} alt={property.pk} />
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
                                            } else {
                                                if (ext === "mp4") {
                                                    return (
                                                        <Carousel.Item key={index}>
                                                            <video className="itemimg" ref={this.videoRef} autoPlay loop muted>
                                                                <source src={item} type="video/mp4" />
                                                          Your browser does not support HTML video.
                                                        </video>
                                                        </Carousel.Item>
                                                    );
                                                }
                                            }
                                            return null;
                                        })
                                    }
                                </Carousel>
                                <Link to={'/feature/' + property.pk} onClick={() => localStorage.setItem('property', JSON.stringify(property))}>
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
            }
            return null;
        });

        return (

            <div className="search bgHeaderPattern">
                <img src={bgPattern} alt="bgPattern" className="bgPattern" />
                <div className="search-field">
                    <img
                        src={location}
                        alt="location"
                        onClick={this.currentLocation}
                    />
                    <div>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handlePlaceChange}
                            onSelect={this.handleSelect}
                            searchOptions={searchOptions}
                        >
                            {renderFunc}
                        </PlacesAutocomplete>
                    </div>
                    <button onClick={this.handleClick}><img src={search} alt="search" /></button>
                </div>

                <div className="filters">
                    <div className="select">
                        <div
                            className="dropDown dR"
                        // onBlur={
                        //     setTimeout(() => {
                        //         this.setState({ showRate: false })
                        //     }, 1000)
                        // }
                        // onBlur={() => this.setState({ showRate: !showRate })}
                        >
                            <button onClick={() => this.setState({
                                showRate: !showRate,
                                showBath: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showSquareFeet: false,
                                showType: false
                            })}>
                                ${from} - ${to}k<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showRate ? "block" : "none" }} className="content">
                                <div className="box1">
                                    <div className="bg">
                                        <div className="graphIntersect">
                                            <img src={graphIntersect} alt="graphIntersect" />
                                        </div>
                                        <input
                                            type="text"
                                            data-min="0"
                                            data-to={to}
                                            defaultValue=""
                                            name="my_range"
                                            data-prefix="$"
                                            data-max="1000"
                                            data-from={from}
                                            data-postfix="k"
                                            data-skin="round"
                                            data-type="double"
                                            data-min-interval="10"
                                            data-hide-min-max="true"
                                            data-values-separator=" - "
                                            className="js-range-slider"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="dropDown"
                        // onBlur={() => this.setState({ showSquareFeet: false })}
                        >
                            <button onClick={() => this.setState({
                                showSquareFeet: !showSquareFeet,
                                showRate: false,
                                showBath: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showType: false
                            })}>
                                {/*
                                { maxSq === 0 && minSq === 0 ? "Square Feet" : `${minSq} - ${maxSq} sq` }
                            */}
                                Square Feet<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showSquareFeet ? "block" : "none" }} className="content">
                                <div className="box1 box2">
                                    <Row>
                                        <Col xs={6}>
                                            <label>
                                                <input
                                                    type="number"
                                                    name="minSq"
                                                    value={minSq}
                                                    placeholder="0 sq"
                                                    onChange={this.handleChange}
                                                />
                                                Min
                                            </label>
                                        </Col>
                                        <Col xs={6}>
                                            <label>
                                                <input
                                                    type="number"
                                                    name="maxSq"
                                                    value={maxSq}
                                                    placeholder="0 sq"
                                                    onChange={this.handleChange}
                                                />
                                                Max
                                            </label>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div
                            className="dropDown dB"
                        // onBlur={() => this.setState({ showBed: false })}
                        >
                            <button onClick={() => this.setState({
                                showBed: !showBed,
                                showRate: false,
                                showBath: false,
                                showCommute: false,
                                showMore: false,
                                showSquareFeet: false,
                                showType: false
                            })}>
                                {/* { bed === -1 ? "Beds" : bed === 0 ? "Any" : bed } */}
                                Bed<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showBed ? "block" : "none" }} className="content">
                                <div className="box1 box3">
                                    {
                                        beds.map((bed, index) => {
                                            let len = beds.length;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => this.setState({ bed: bed })}
                                                    className={bed === this.state.bed ? "active" : ""}
                                                    style={{
                                                        border: index === len - 1 ? "none" : "",
                                                        borderRadius: index === 0 ? "6px 6px 0 0" :
                                                            index === len - 1 ? "0 0 6px 6px" : ""
                                                    }}
                                                >
                                                    {bed === 0 ? "Any" : bed}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div
                            className="dropDown dB"
                        // onBlur={() => this.setState({ showBath: false })}
                        >
                            <button onClick={() => this.setState({
                                showBath: !showBath,
                                showRate: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showSquareFeet: false,
                                showType: false
                            })}>
                                {/* { baths === -1 ? "Baths" : bath === 0 ? "Any" : bath } */}
                                Bath<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showBath ? "block" : "none" }} className="content">
                                <div className="box1 box3 box4">
                                    {
                                        baths.map((bath, index) => {
                                            let len = baths.length;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => this.setState({ bath: bath })}
                                                    className={bath === this.state.bath ? "active" : ""}
                                                    style={{
                                                        border: index === len - 1 ? "none" : "",
                                                        borderRadius: index === 0 ? "6px 6px 0 0" :
                                                            index === len - 1 ? "0 0 6px 6px" : ""
                                                    }}
                                                >
                                                    {bath === 0 ? "Any" : bath}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div
                            className="dropDown"
                        // onBlur={() => this.setState({ showType: false })}
                        >
                            <button onClick={() => this.setState({
                                showType: !showType,
                                showBath: false,
                                showRate: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showSquareFeet: false
                            })}>
                                Property Type<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showType ? "block" : "none" }} className="content">
                                <div className="box1 box5">
                                    <Row>
                                        <Col xs={4}>
                                            <div id="House" className="active" onClick={this.setPropertyType} style={{ cursor: "pointer" }}>
                                                <img src={checkCircle} alt="checkCircle" className="c" />
                                                <img name="House" src={blackHouse} alt="blackHouse" />
                                                <p id="House" >House</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Condo" onClick={this.setPropertyType} style={{ cursor: "pointer" }}>
                                                <img src={checkCircle} alt="checkCircle" className="c" />
                                                <img name="Condo" src={condo} alt="condo" />
                                                <p id="Condo" >Condo</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Townhouse" onClick={this.setPropertyType} style={{ cursor: "pointer" }}>
                                                <img src={checkCircle} alt="checkCircle" className="c" />
                                                <img name="Townhouse" src={townHouse} alt="townHouse" />
                                                <p id="Townhouse" >Townhouse</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Multifamily" onClick={this.setPropertyType} style={{ cursor: "pointer" }}>
                                                <img src={checkCircle} alt="checkCircle" className="c" />
                                                <img name="Multifamily" src={multiFamily} alt="multiFamily" />
                                                <p id="Multifamily" >Multifamily</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Land" onClick={this.setPropertyType} style={{ cursor: "pointer" }}>
                                                <img src={checkCircle} alt="checkCircle" className="c" />
                                                <img name="Land" src={land} alt="land" />
                                                <p id="Land">Land</p>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div id="Otherhouse" onClick={this.setPropertyType} style={{ cursor: "pointer" }}>
                                                <img src={checkCircle} alt="checkCircle" className="c" />
                                                <img name="Otherhouse" src={otherHouse} alt="otherHouse" />
                                                <p id="Otherhouse" >Otherhouse</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div
                            className="dropDown"
                        // onBlur={() => this.setState({ showCommute: false })}
                        >
                            <button onClick={() => this.setState({
                                showCommute: !showCommute,
                                showBath: false,
                                showRate: false,
                                showBed: false,
                                showMore: false,
                                showSquareFeet: false,
                                showType: false
                            })}>
                                Commute<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showCommute ? "block" : "none" }} className="content">
                                <div className="box1 box6">
                                    <PlacesAutocomplete
                                        value={commuteAddress}
                                        onChange={this.handleCommuteAddress}
                                        onSelect={this.handleCommuteSelect}
                                        searchOptions={searchOptions}
                                    >
                                        {renderFunc}
                                    </PlacesAutocomplete>
                                    <h4>Select maximum drive time</h4>
                                    <div>
                                        {
                                            commutes.map((commute, index) => {
                                                let len = commutes.length;
                                                return (
                                                    <div onClick={() => this.distanceFunc(commute)}>
                                                        <button
                                                            key={index}
                                                            onClick={() => {
                                                                this.setState({ commute });
                                                            }}
                                                            className={commute === this.state.commute ? "active" : ""}
                                                            style={{
                                                                border: index === len - 1 ? "none" : "",
                                                                borderRadius: index === 0 ? "6px 6px 0 0" :
                                                                    index === len - 1 ? "0 0 6px 6px" : ""
                                                            }}
                                                        >
                                                            {commute === 0 ? "Any" : `${commute} min`}
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button
                                        style={{
                                            color: "#ffffff",
                                            background: "#0042cc",
                                            width: "154px",
                                            margin: "0 0 0 170px"
                                        }}
                                        onClick={() => { this.commuteFilter() }}
                                    >Apply</button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="dropDown"
                        // onBlur={() => this.setState({ showMore: false })}
                        >
                            <button onClick={() => this.setState({
                                showMore: !showMore,
                                showBath: false,
                                showRate: false,
                                showBed: false,
                                showCommute: false,
                                showSquareFeet: false,
                                showType: false
                            })}>
                                More<img src={arrowDown} alt="arrowDown" />
                            </button>
                            <div style={{ display: showMore ? "block" : "none" }} className="content">
                                <div className="box1 box7">
                                    <h4>Listing Type</h4>
                                    <div className="Switch">
                                        <p>New Construction</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Must Have Garage</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Accessible Only</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Must Have Pool</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Have Basement</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <h4>Shows Only</h4>
                                    <div className="Switch">
                                        <p>Open House</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Price Reduced</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="Switch">
                                        <p>Include Estimates</p>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <select defaultValue={school} onChange={(e) => this.setState({ school: e.target.value })}>
                            <option value={0} disabled hidden>School</option>
                            {
                                schools.map((school, index) => {
                                    return (<option key={index} value={school}>{school}</option>)
                                })
                            }
                        </select>
                        <button onClick={() => { this.filterFunc() }}>Apply</button>
                    </div>
                    <div className="buttons">
                        <button onClick={() => { this.filterFunc() }}>Apply</button>
                    </div>
                </div>
                <div className="available">
                    <div className="head-title">
                        <h5>{properties.length} {properties.length === 1 ? "home" : "homes"}  available</h5>
                        {/* <div className="dropDown dB">
                            <button onClick={() => this.setState({
                                showBath: !showBath,
                                showRate: false,
                                showBed: false,
                                showCommute: false,
                                showMore: false,
                                showSquareFeet: false,
                                showType: false
                            })}>
                                Sort by<img src={whiteArrowDown} alt="whiteArrowDown" />
                            </button>
                            <div style={{ display: showBath ? "block" : "none" }} className="content">
                                <div className="box1 box3 box4">
                                    {
                                        baths.map((bath, index) => {
                                            let len = baths.length;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => this.setState({ bath: bath })}
                                                    className={bath === this.state.bath ? "active" : ""}
                                                    style={{
                                                        border: index === len - 1 ? "none" : "",
                                                        borderRadius: index === 0 ? "6px 6px 0 0" :
                                                            index === len - 1 ? "0 0 6px 6px" : ""
                                                    }}
                                                >
                                                    {bath === 0 ? "Any" : bath}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div> */}
                        <select
                            defaultValue={home}
                            className="mt-auto"
                            onChange={this.changeValue}
                        >
                            <option value={0} disabled hidden>Sort by</option>
                            {
                                homes.map((home, index) => {
                                    let len = homes.length;
                                    return (
                                        <option
                                            key={index}
                                            value={home}
                                            style={{
                                                border: index === len - 1 ? "none" : "2px",
                                                borderRadius: index === 0 ? "6px 6px 0 0" :
                                                    index === len - 1 ? "0 0 6px 6px" : ""
                                            }}
                                        >
                                            {home}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <Row>
                        <Col lg={5} className="propertyCol">
                            <Row className="similar">
                                {propertiesList}
                            </Row>
                        </Col>
                        <Col lg={7} className="map-col">
                            {this.props[0].map((index, val) => (
                                <MapsGoogle
                                    // lat={this.state.lat}
                                    // lng={this.state.lng}
                                    index={index}
                                    center={{ lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }}
                                    mouseEnterId={mouseEnterId}
                                    filterFuncValue={filterFuncArray}
                                    parentCallback={this.handleCallback}
                                    zoomLevel={zoomLevel}
                                // mapProperties={this.state.properties}
                                />
                            ))}
                        </Col>
                        {/* <Col lg={6} className="paginationCol">
                            <div className="pagination">
                                <a href="/search" className="active">1</a>
                                <a href="/search">2</a>
                                <a href="/search">3</a>
                                <a href="/search">. . . .</a>
                                <a href="/search">15</a>
                                <a href="/search">&gt;</a>
                            </div>
                            <p className="pagination">1 -8 of 200+ Home</p>
                        </Col> */}
                    </Row>
                </div>
            </div >

        );

    }

}

Search.defaultProps = googleMapStyles;
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE")
})(Search)
