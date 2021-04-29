import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Geocode from "react-geocode";

import loan from '../assets/images/loan.png';
import check from '../assets/icons/check.png';
import loanIcon from '../assets/icons/loan.png';
import gain from '../assets/images/gain-image.png';

import rent from '../assets/icons/rent.png';
import calc from '../assets/icons/calc.png';
import house1 from '../assets/images/b.png';
import house3 from '../assets/images/a.png';
import home from '../assets/images/home.png';
import house from '../assets/icons/house.png';
import house2 from '../assets/images/house2.png';
import sellimg from '../assets/images/sellimg.png';
import location from '../assets/icons/location.png';
import emptyhouse from '../assets/icons/emptyhouse.png';
import {
    // Map,
    // InfoWindow,
    // Marker,
    GoogleApiWrapper
} from 'google-maps-react';
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

class Home extends React.Component {

    constructor() {
        super();

        this.state = {
            address: '',
            currLat: '',
            currLng: '',
            searchResult: '',
            stope1: false,
        }

    }
    handlePlaceChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        console.log(address)
        this.setState({ address: address })
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({ currLat: latLng.lat, currLng: latLng.lng })
            })
            .catch(error => console.error('Error', error));
    };
    handleClick = () => {
        // localStorage.setItem('lat', this.state.currLat)
        // localStorage.setItem('lng', this.state.currLng)
        this.props.history.push("/search", [this.state.currLat, this.state.currLng])
        // console.log(this.props.history.location.state)
    }


    render() {
        const { stope1 } = this.state


        Geocode.setApiKey("AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE");
        if (stope1 === false) {
            Geocode.fromLatLng(localStorage.getItem('lat'), localStorage.getItem('lng')).then(
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


        // < script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE&map_ids=b27e6dd66233d0b0&libraries=places"></script >
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
        const searchOptions = {
            componentRestrictions: { country: ['ca'] }
        }


        return (

            <div className="home">

                <div className="to-gain">
                    <Row className="m-0">
                        <Col lg={1} md={1} sm={1} xs={12}></Col>
                        <Col lg={5} md={5} sm={5} xs={12}>
                            <div className="propertytalks">
                                <div>
                                    <h2>Eign to gain your property deal</h2>
                                    <div className="search-field">
                                        <div>
                                            <img src={location} alt="location" />
                                            <PlacesAutocomplete
                                                value={this.state.address}
                                                onChange={this.handlePlaceChange}
                                                onSelect={this.handleSelect}
                                                searchOptions={searchOptions}
                                            >
                                                {renderFunc}
                                            </PlacesAutocomplete>
                                        </div>
                                        <button onClick={this.handleClick}>Search</button>
                                    </div>
                                    <p>
                                        Be in charge of your real estate transaction with access to a
                                        comprehensive marketplace of houses.
                                    </p>
                                </div>
                            </div>
                            <div className="backimg" style={{ display: "none" }}>
                                <img src={home} alt="home" />
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12} className="p-0">
                            <div className="mainbg">
                                <img src={home} alt="home" />
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="centertext">
                    <h3> Eign is The Ultimate Platform for Online Real Estate</h3>
                    <p>Find out how EIGN can help you</p>
                </div>

                <Container>
                    <Row>
                        <Col lg={4} md={4} sm={12} xs={12} >
                            <div className="union">
                                <img src={house} alt="house" />
                                <h3>Buy your home</h3>
                                <p>
                                    Leave the traditional way to buy in the past!Get advanced home
                                    analysis,direct no-agent sales, and cash back opportunities.
                                </p>
                                <button>Buy Now</button>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <div className="union blue">
                                <img src={emptyhouse} alt="emptyhouse" />
                                <h3>Sell your home</h3>
                                <p>
                                    Save up to 5.5% and put those thousands of dollars in your pocket! Be
                                    in charge of a comprehensive, start-to-finish online selling process.
                                </p>
                                <button>Search Now</button>
                            </div>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={12}>
                            <div className="union">
                                <img src={rent} alt="rent" />
                                <h3>Rent a home</h3>
                                <p>
                                    Experience renting a property backed by vast amount of data about
                                    your future neighbourhood.View the properties in virtual reality from
                                    wherever you are in the world.
                                </p>
                                <button>Search Now</button>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col lg={5} md={5} sm={5} xs={10} >
                            <div className="sellimg">
                                <img src={sellimg} alt="sellimg" className="imgproperties" />
                            </div>
                        </Col>
                        <Col lg={1} md={1} sm={1} xs={2}></Col>
                        <Col lg={5} md={6} sm={6} xs={12}>
                            <div className="sellmore">
                                <div className="calc">
                                    <img src={calc} alt="calc" />
                                </div>
                                <Col lg={9} md={12} sm={12} xs={12} className="p-0">
                                    <h3>Sell for more than the home next door</h3>
                                    <p>Request a free, no-obligation consultation with a local Habrick Agent.</p>
                                </Col>
                                <div className="evaluate">
                                    <input id="eval" type="text" />
                                    <button>Evaluate</button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={1} md={12} sm={12} xs={12}></Col>
                    </Row>
                </Container>

                <div className="bg-gain">
                    <Container>
                        <Row>
                            <Col lg={7} md={7} sm={6} xs={12}>
                                <div className="gain">
                                    <h4>Eign to Gain</h4>
                                    <h6>
                                        Emerging Technologies Replacing the Middle-Man and Saving You
                                        Thousands of Dollars
                                    </h6>
                                    <p>
                                        <img src={check} alt="check" />
                                        <span>
                                            Big Data allows informed real estate decisions with greater
                                            accuracy AI and ML to match buyers and sellers and suggest
                                            best homes for your taste
                                        </span>
                                    </p>
                                    <p>
                                        <img src={check} alt="check" />
                                        <span>
                                            Virtual Reality to view your dream home wherever you are in
                                            the world
                                        </span>
                                    </p>
                                    <button>Learn more</button>
                                </div>
                            </Col>
                            <Col lg={4} md={5} sm={6} xs={12} className="center">
                                <img src={gain} alt="gain" className="gain-image" />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="bg-loan">
                    <Container>
                        <Row>
                            <Col lg={5} md={5} sm={5} xs={11}>
                                <div className="loan-image">
                                    <img src={loan} alt="loan" />
                                </div>
                            </Col>
                            <Col lg={1} md={1} sm={1} xs={1}></Col>
                            <Col lg={4} md={6} sm={6} xs={12}>
                                <div className="loan">
                                    <img src={loanIcon} alt="loanIcon" />
                                    <h4>Do It Yourself the easy way</h4>
                                    <p>
                                        You can gain competitive advantage with minimal fees of 0.5% while
                                        getting better services and more accurate data.
                                    </p>
                                    <button>About us</button>
                                </div>
                            </Col>
                            <Col lg={2} md={1} sm={1} xs={1}></Col>
                        </Row>
                    </Container>
                </div>

                <Container>
                    <Row className="settingmargin">
                        <Col lg={6} md={12} sm={12} xs={12} className="m-0">
                            <h3>Knowing the tricks can make the deal more attractive</h3>
                        </Col>
                        <Col lg={6} md={12} sm={12} xs={12} className="m-0"></Col>
                        <Col xs={4}>
                            <div>
                                <img src={house1} alt="house1" />
                                <p><span className="dot"></span>Home Loan</p>
                                <Col lg={9} md={9} sm={9} xs={9} className="p-0">
                                    <h4>Anyone can hold the helm when the sea is calm</h4>
                                </Col>
                                <a href="/">Read More</a>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div>
                                <img src={house2} alt="house2" />
                                <p><span className="dot"></span>Car Loan</p>
                                <Col lg={9} md={9} sm={9} xs={9} className="p-0">
                                    <h4>Anyone can hold the helm when the sea is calm</h4>
                                </Col>
                                <a href="/">Read More</a>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div>
                                <img src={house3} alt="house3" />
                                <p><span className="dot"></span>Home Loan</p>
                                <Col lg={9} md={9} sm={9} xs={9} className="p-0">
                                    <h4>Anyone can hold the helm when the sea is calm</h4>
                                </Col>
                                <a href="/">Read More</a>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>

        );

    }

}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE")
})(Home)