import React from 'react';

// import axios from 'axios';

import { Container, Row, Col, Tab, Spinner } from 'react-bootstrap';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import googleMapStyles from "../components/googleMap/submitStyle";

import Geocode from "react-geocode";

import whiteLand from './../assets/icons/white-land.svg';
import blackLand from './../assets/icons/black-land.svg';
import whiteHouse from './../assets/icons/white-house.svg';
import blackHouse from './../assets/icons/black-house.svg';
import whiteCondo from './../assets/icons/white-condo.svg';
import blackCondo from './../assets/icons/black-condo.svg';
import whiteTownHouse from './../assets/icons/white-town-house.svg';
import blackTownHouse from './../assets/icons/black-town-house.svg';
import whiteOtherHouse from './../assets/icons/white-other-house.svg';
import blackOtherHouse from './../assets/icons/black-other-house.svg';
import whiteMultiFamily from './../assets/icons/white-multi-family.svg';
import blackMultiFamily from './../assets/icons/black-multi-family.svg';

// import submitadd from './../assets/icons/s-add.png';
// import blogsearch from './../assets/icons/b-search.png';
import submitaddimg from '../assets/icons/s-addmore.png';
import checkCircle from './../assets/icons/checkCircle.png';
// import submitellipse from './../assets/icons/s-ellipse.png';
// import submitellipseblue from './../assets/icons/s-ellipseblue.png';

// import submitmap from './../assets/images/s-map.png';
import submitupload from '../assets/images/s-upload.png';

// import {NodeFetchHelper} from '../utils/NodeFetchHelper';
import { ServerCallings } from "../utils/ServerCallings";
import S3 from 'react-aws-s3';
// import DatePicker from "react-multi-date-picker";
// import MultipleDatePicker from 'react-multiple-datepicker'
// import TimePicker from 'react-bootstrap-time-picker';
import uuid from 'react-uuid';
import {
    geocodeByAddress,
    // geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

const config = {
    bucketName: 'eign-assets',
    region: 'ca-central-1',
    accessKeyId: 'AKIAJ2BV6XNEHELFBXEQ',
    secretAccessKey: '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',
}
const ReactS3Client = new S3(config);
let filesToBeUploaded = ["https://eign-assets.s3-ca-central-1.amazonaws.com/e27bc5-841a-0b02-5362-2ece3812ed1imgs.jpeg"]

const uploadToS3 = (file) => {
    ReactS3Client.uploadFile(file, uuid() + "imgs")
        .then((data) => {
            filesToBeUploaded.push(data.location)
            // console.log("hello")
            // console.log(filesToBeUploaded)
        })
        .catch((err) => {
            console.log("Catch")
            console.log(err)
        })
}

class Submitproperty extends React.Component {

    constructor() {
        super();

        this.state = {
            buildDate: "2021",
            tax: 0,
            lot: 0,
            HOA: 0,
            map: "",
            area: 0,
            beds: 0,
            baths: 0,
            price: 0,
            payment: 0,
            stories: 0,
            interest: 0,
            mortgage: 0,
            address: "canada",
            insurance: 0,
            error: false,
            key: "first",
            community: "12",
            loader: false,
            noiseLevel: "",
            uploadedPath: "",
            uploadedPaths: [],
            nearBySchools: "",
            propertyDetail: "good house",
            propertyType: "House",
            propertySubmitted: "",
            propertyNotSubmitted: "",
            lat: localStorage.getItem('lat'),
            lng: localStorage.getItem('lng'),
            hoaDues: "",
            appliances: ["Dishwasher",],
            basement: ["Finished",],
            coolingType: [],
            heatingType: ["Baseboard",],
            floorCovering: ["Carpet",],
            exterior: ["Bric",],
            outdoor: ["Balcony/patio",],
            parking: ["Carport",],
            dates: ["2021 / 02 / 20",],
            date: new Date(),
            startTime: 3600,
            endTime: 75600,
            websiteUrl: "",
            parkingSpaces: 1,
            locAddress: '',

            interior: false,
            utility: false,
            exteriorDropdown: false,
            files: []

        }
        this.onMarkerDragEnd = this.onMarkerDragEnd.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleCheckboxChangeBasement = this.handleCheckboxChangeBasement.bind(this)
        this.handleCheckboxChangeCoolingType = this.handleCheckboxChangeCoolingType.bind(this)
        this.handleCheckboxChangeHeatingType = this.handleCheckboxChangeHeatingType.bind(this)
        this.handleCheckboxChangeFloorCovering = this.handleCheckboxChangeFloorCovering.bind(this)
        this.handleCheckboxChangeExterior = this.handleCheckboxChangeExterior.bind(this)
        this.handleCheckboxChangeOutdoor = this.handleCheckboxChangeOutdoor.bind(this)
        this.handleCheckboxChangeParking = this.handleCheckboxChangeParking.bind(this)
        this.handleMultipleDates = this.handleMultipleDates.bind(this)
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this)
        this.handleUrl = this.handleUrl.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlePlaceChange = this.handlePlaceChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)


    }

    componentWillMount() {
        // let self = this
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(function (position) {
                localStorage.setItem('lat', position.coords.latitude)
                localStorage.setItem('lng', position.coords.longitude)
            })
        }
        // else {
        //     localStorage.setItem('lat', 31.494084100000002)
        //     localStorage.setItem('lng', 74.4185972)
        // }
    }
    handlePlaceChange = address => {
        this.setState({ locAddress: address });
    };

    handleSelect = address => {
        this.setState({ locAddress: address })
        // console.log(address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                // console.log(latLng)
                this.setState({ lat: latLng.lat, lng: latLng.lng })
            })
            .catch(error => console.error('Error', error));
    };

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleUrl(e) {
        this.setState({ websiteUrl: e.target.value })
    }
    handleStartTimeChange(time) {
        this.setState({ startTime: time })

    }
    handleEndTimeChange(time) {
        this.setState({ endTime: time })
    }
    handleMultipleDates(event) {
        this.setState({ dates: [] })
        let temp = [];
        for (let i = 0; i < event.length; i++) {
            let newDate = event[i].day + "/" + event[i].month.number + "/" + event[i].year;
            temp.push(newDate);
        }
        this.setState({ date: event, dates: temp })
    }

    onMarkerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState({ lat: lat, lng: lng })
        Geocode.setApiKey("AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE");
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                this.handleSelect(address)
                this.setState({ address: address })
                // console.log(this.state.address)
            },
            (error) => {
                console.error(error);
            }
        );
    };
    handleCheckboxChange = event => {
        let newArray = [...this.state.appliances, event.target.value];
        if (this.state.appliances.includes(event.target.value)) {
            newArray = newArray.filter(appliance => appliance !== event.target.value);
        }
        this.setState({
            appliances: newArray
        });
    };
    handleCheckboxChangeBasement = event => {
        let newArray = [...this.state.basement, event.target.value];
        if (this.state.basement.includes(event.target.value)) {
            newArray = newArray.filter(basement => basement !== event.target.value);
        }
        this.setState({
            basement: newArray
        });
        console.log(this.state.basement);
    };
    handleCheckboxChangeCoolingType = event => {
        let newArray = [...this.state.coolingType, event.target.value];
        if (this.state.coolingType.includes(event.target.value)) {
            newArray = newArray.filter(cooling => cooling !== event.target.value);
        }
        this.setState({
            coolingType: newArray
        });
    };
    handleCheckboxChangeHeatingType = event => {
        let newArray = [...this.state.heatingType, event.target.value];
        if (this.state.heatingType.includes(event.target.value)) {
            newArray = newArray.filter(heating => heating !== event.target.value);
        }
        this.setState({
            heatingType: newArray
        });
    };
    handleCheckboxChangeFloorCovering = event => {
        let newArray = [...this.state.floorCovering, event.target.value];
        if (this.state.floorCovering.includes(event.target.value)) {
            newArray = newArray.filter(floor => floor !== event.target.value);
        }
        this.setState({
            floorCovering: newArray
        });
    };
    handleCheckboxChangeExterior = event => {
        let newArray = [...this.state.exterior, event.target.value];
        if (this.state.exterior.includes(event.target.value)) {
            newArray = newArray.filter(exterior => exterior !== event.target.value);
        }
        this.setState({
            exterior: newArray
        });
    };
    handleCheckboxChangeOutdoor = event => {
        let newArray = [...this.state.outdoor, event.target.value];
        if (this.state.outdoor.includes(event.target.value)) {
            newArray = newArray.filter(outdoor => outdoor !== event.target.value);
        }
        this.setState({
            outdoor: newArray
        });
    };
    handleCheckboxChangeParking = event => {
        let newArray = [...this.state.parking, event.target.value];
        if (this.state.parking.includes(event.target.value)) {
            newArray = newArray.filter(parking => parking !== event.target.value);
        }
        this.setState({
            parking: newArray
        });
    };

    handleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        if (value.indexOf('$') !== -1) {

            value = value.replace('$', '');

        } else if (value.indexOf(' lot') !== -1) {

            value = value.replace(' lot', '');

        } else if (value.indexOf(' sqf') !== -1) {

            value = value.replace(' sqf', '');

        }

        if (!isNaN(value)) {

            if (value !== "") {

                this.setState({ [name]: parseInt(value) })

            } else this.setState({ [name]: 0 })

        }

    }

    remove = (index) => {

        let { uploadedPaths } = this.state;
        uploadedPaths.splice(index, 1);
        filesToBeUploaded.splice(index, 1);
        // filesToBeUploaded = filesToBeUploaded
        this.setState({ uploadedPaths: uploadedPaths })

    }

    addMore = (e) => {
        // var files = []
        for (var i = 0; i < e.target.files.length; i++) {
            this.state.files.push(e.target.files[i])
        }
        this.setState({ uploadedPaths: this.state.files })

        uploadToS3(e.target.files[0])
    }

    submitProperty = () => {
        // console.log("Component wil mount")
        // console.log(filesToBeUploaded)

        const {
            lot, HOA, beds, baths, price, tax, interest, mortgage, stories, address, insurance, area, noiseLevel, buildDate,
            propertyType, propertyDetail, community, nearBySchools, payment, lat, lng, websiteUrl,
            coolingType, parkingSpaces, parking, dates, startTime, endTime,
        } = this.state;
        // if (uploadedPath === "" || community === "" || address === "" || propertyDetail === "" || nearBySchools === "" || appliances.length < 1 || basement.length < 1
        //     || coolingType.length < 1 || heatingType.length < 1 || floorCovering.length < 1 || exterior.length < 1 || outdoor.lenght < 1
        //     || parking.length < 1 || dates.length < 1 || websiteUrl === "") {

        //     if (!error) {
        //         this.setState({ error: true })
        //     }

        // } else {

        // let body = {
        //     HOA: parseInt(HOA),
        //     area: area,
        //     baths: baths,
        //     beds: beds,
        //     community: community,
        //     commute_drive_time: 232,
        //     home_address: address,
        //     // image_or_video: uploadedPath,
        //     insurance: insurance,
        //     interest: interest,
        //     lot: lot,
        //     mortgage_insurance: mortgage,
        //     near_by_schools: nearBySchools,
        //     // noise_level: noiseLevel === "yes" ? true : false,
        //     price: price,
        //     property_detail: propertyDetail,
        //     property_type: propertyType,
        //     stories_of_property: stories,
        //     tax: tax,
        //     uploaded_data: [
        //         ...this.state.uploadedPaths,
        //         this.state.uploadedPath
        //         // uploadedPath
        //         // uploadedPaths
        //     ]
        // }

        let body = {
            'image_or_video': filesToBeUploaded.join(','),
            'price': parseInt(price),
            'est_payment': parseInt(payment),
            'home_address': address,
            'community': community,
            'beds': parseInt(beds),
            'baths': parseInt(baths),
            'property_detail': propertyDetail,
            'area': parseInt(area),
            // 'basement': basement,
            'property_type': propertyType,
            'location_lat': lat,
            'location_long': lng,
            'HOA': parseInt(HOA),
            // 'commute_drive_time': 232,
            'insurance': parseInt(insurance),
            'interest': parseInt(interest),
            'lot': parseInt(lot),
            'mortgage_insurance': parseInt(mortgage),
            'nearby_schools': nearBySchools,
            'stories': parseInt(stories),
            'tax': parseInt(tax),
            'ParkingSpaces': parseInt(parkingSpaces),
            // 'coolingType': coolingType,
            'CodingType': parseInt(coolingType),
            // 'HeatingType': heatingType,
            // 'FloorCovering': floorCovering,
            // 'Exterior': exterior,
            // 'OUTDOOR': outdoor,
            // 'appliances': appliances,
            'year_built': parseInt(buildDate),
            'Date': dates,
            'Parking': parking,
            'start_time': startTime,
            'end_time': endTime,
            'website_url': websiteUrl,
            'noise_level': noiseLevel === "yes" ? true : false,
            'user': localStorage.getItem("id"),

        }

        // console.log(body)

        this.setState({ loader: true })

        ServerCallings.postProperty(body, (data) => {
            const isLogedin = localStorage.getItem("id");
            if (data && isLogedin) {
                this.setState({ propertySubmitted: "Property Submitted Successfully!", loader: false })
                setTimeout(() => this.setState({ propertySubmitted: "" }), 4000)
            } else {
                this.setState({ propertyNotSubmitted: "please Login first!", loader: false })
                setTimeout(() => this.setState({ propertyNotSubmitted: "" }), 4000)
            }
        })

        // let form_data = new FormData();
        // form_data.append('image_or_video', uploadedPath, uploadedPath?.name);
        // form_data.append('price', price);
        // form_data.append('home_address', address);
        // form_data.append('community', community);
        // form_data.append('beds', beds);
        // form_data.append('baths', baths);
        // form_data.append('property_detail', propertyDetail);
        // form_data.append('area', area);
        // form_data.append('stories_of_property', stories);
        // form_data.append('interest', interest);
        // form_data.append('tax', tax);
        // form_data.append('HOA', HOA);
        // form_data.append('insurance', insurance);
        // form_data.append('mortgage_insurance', mortgage);
        // form_data.append('noise_level', noiseLevel === "yes" ? true : false);
        // form_data.append('property_type', propertyType);
        // form_data.append('lot', lot);
        // form_data.append('near_by_schools', nearBySchools);

        // let url = "https://eign-backend.herokuapp.com/property/post-property/";
        //
        // if (!loader) {
        //     this.setState({loader: true})
        // }
        //
        // let check = false;
        //
        // NodeFetchHelper.post(url, null, null, body, (status, data) => {
        //
        //     if (data && status === 200) {
        //         check = true;
        //         this.setState({propertySubmitted: "Property Submitted Successfully!", loader: false})
        //         setTimeout(() => this.setState({propertySubmitted: ""}), 4000)
        //     } else if (data && status > 200) {
        //         check = true;
        //         this.setState({propertyNotSubmitted: "Error!", loader: false})
        //         setTimeout(() => this.setState({propertyNotSubmitted: ""}), 4000)
        //     } else if (!check) {
        //         check = false;
        //         this.setState({propertyNotSubmitted: "Something went wrong!", loader: false})
        //         setTimeout(() => this.setState({propertyNotSubmitted: ""}), 4000)
        //     }
        //
        // })
        //
        // let form_data = new FormData();
        // form_data.append('image_or_video', uploadedPath, uploadedPath?.name);
        //
        // url = "https://eign-backend.herokuapp.com/upload/file/";
        //
        // axios.post(url, form_data, {headers: {'Content-Type': 'multipart/form-data'}})
        //     .then(res => {
        //         console.log(res.data);
        //         this.setState({propertySubmitted: "Property Submitted Successfully!", loader: false})
        //         setTimeout(() => this.setState({propertySubmitted: ""}), 4000)
        //     }).catch(err => {
        //     console.log(err)
        //     this.setState({propertyNotSubmitted: "Error", loader: false})
        //     setTimeout(() => this.setState({propertyNotSubmitted: ""}), 4000)
        // })

        // }

    }

    onTabChange = (tabKey) => {
        this.setState({ key: tabKey });
        window.scrollTo(0, 0);
    }

    render() {
        const searchOptions = {
            componentRestrictions: { country: ['ca'] }
        }
        const {
            lot, HOA, beds, baths, price, payment, stories, error, area,
            key, propertyDetail, community, loader, uploadedPath, uploadedPaths,
            propertyType, propertySubmitted, propertyNotSubmitted, websiteUrl, parkingSpaces
        } = this.state;
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE&libraries=places"></script>
        const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
            <div className="autocomplete-root">
                <input {...getInputProps()} placeholder="Search Location Here" />
                <div className="autocomplete-dropdown-container">
                    {/* {loading && <div>Loading...</div>} */}
                    {suggestions.map(suggestion => (
                        <div {...getSuggestionItemProps(suggestion)}>
                            <span>{suggestion.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
        return (
            <div className="submitproperty">
                <Container className="submit">
                    <Tab.Container id="left-tabs-example" activeKey={key}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Row>
                                    <Col lg={10} md={12} sm={12} xs={12} className="col">
                                        <div className="property">
                                            <p className="heading">Property Address</p>
                                        </div>
                                        <div className="detail">
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12} className="detailleft">
                                                    <label>Your home address</label><br />
                                                    <PlacesAutocomplete
                                                        value={this.state.locAddress}
                                                        onChange={this.handlePlaceChange}
                                                        onSelect={this.handleSelect}
                                                        searchOptions={searchOptions}
                                                    >
                                                        {renderFunc}
                                                    </PlacesAutocomplete>
                                                    <br />
                                                    <div className="searchandimg">
                                                        <Map google={this.props.google} zoom={17}
                                                            center={
                                                                {
                                                                    lat: this.state.lat,
                                                                    lng: this.state.lng
                                                                }
                                                            }
                                                            styles={this.props.Style}
                                                            className="submitmapimg"
                                                            gestureHandling={'greedy'}
                                                            minZoom={'14'}
                                                        >
                                                            <Marker
                                                                draggable={true}
                                                                onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                                                position={{
                                                                    lat: this.state.lat,
                                                                    lng: this.state.lng
                                                                }

                                                                }
                                                                name={this.state.map}
                                                            />
                                                        </Map>
                                                    </div>
                                                    {/* {
                                                        error && address === "" ?
                                                            <div className="error">Please fill out this
                                                                field.</div> : ""
                                                    } */}
                                                    {
                                                        //Add open house in the form
                                                    }
                                                    {/* <div className="openHouse">
                                                        <label>Open House</label>
                                                        <p style={{ width: "100% !important" }}>
                                                            Open housing may not currently allow for social distancing or comply with public
                                                            health orders. Please consider alternatives, such as Zillow 3D home tours or
                                                            scheduling a real time video tour.
                                                    </p>
                                                    </div>
                                                    <label>Select Dates</label>
                                                    <br />
                                                    <DatePicker value={date} onChange={this.handleMultipleDates} multiple={true} />
                                                    {
                                                        error && dates.length < 1 ?
                                                            <div className="error">Please fill out this
                                                                field.</div> : ""
                                                    }
                                                    <br />
                                                    <label>Start Time:</label>
                                                    <TimePicker start="10:00" end="21:00" value={startTime} onChange={this.handleStartTimeChange} step={30} />
                                                    <label>End Time:</label>
                                                    <TimePicker start="10:00" end="21:00" value={endTime} onChange={this.handleEndTimeChange} step={30} /> */}

                                                    <button
                                                        className="continue"
                                                        onClick={() => this.onTabChange('second')}
                                                    // onClick={() => {
                                                    //     this.setState({ key: "second" });
                                                    //     window.scrollTo(0, 0);
                                                    // }}
                                                    >
                                                        Continue
                                                    </button>
                                                </Col>

                                                <Col lg={6} md={6} sm={12} xs={12} className="detailright"></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Row>
                                    <Col lg={10} md={12} sm={12} xs={12} className="col">
                                        <div className="property">
                                            <p className="heading">House Information</p>
                                            {
                                                uploadedPath ? (
                                                    <img
                                                        alt="video"
                                                        className="uploadedimg"
                                                        src={URL.createObjectURL(uploadedPath)}
                                                    />
                                                ) : (
                                                    <label htmlFor="file-input" className="dottedborderbox">
                                                        <img
                                                            src={submitupload}
                                                            alt="submitupload"
                                                            className="submitupload"
                                                        />
                                                        <input
                                                            type="file"
                                                            id="file-input"
                                                            accept="image/*, video/*"
                                                            onChange={(e) => {
                                                                this.setState({ uploadedPath: e.target.files[0] })
                                                                // console.log(e.target.files[0]);
                                                                uploadToS3(e.target.files[0])
                                                            }}
                                                        />
                                                        <p>Upload images, Video</p>
                                                    </label>
                                                )
                                            }
                                            {/* {
                                                error && uploadedPath === "" ?
                                                    <div className="error">Please upload image or video.</div> : ""
                                            } */}
                                        </div>

                                        <div className="more-images">
                                            {
                                                uploadedPaths.map((path, index) => {
                                                    return (
                                                        <label
                                                            key={index}
                                                            htmlFor="uploaded-path"
                                                            className="uploaded-path"
                                                        >
                                                            <i
                                                                className="fa fa-times"
                                                                onClick={() => this.remove(index)}
                                                            />
                                                            <br />
                                                            <img
                                                                src={URL.createObjectURL(path)}
                                                                alt="video"
                                                                className="uploadedPath"
                                                            />
                                                            {/* <input
                                                                type="file"
                                                                id="add-more"
                                                                accept="image/*, video/*"
                                                                onChange={this.addMore}
                                                            /> */}
                                                        </label>
                                                    )
                                                })
                                            }
                                            <label htmlFor="add-more" className="addMore">
                                                <img src={submitaddimg} alt="submitaddimg" className="submitaddimg" />
                                                <br />Add more
                                                <input
                                                    type="file"
                                                    id="add-more"
                                                    accept="image/*, video/*"
                                                    onChange={this.addMore}
                                                />
                                            </label>
                                        </div>
                                        <div className="detail">
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12} className="detailright">
                                                    <Row>
                                                        <Col lg={6} md={6} sm={12} xs={12} className="sqf">
                                                            <label>Price</label><br />
                                                            <input
                                                                name="price"
                                                                value={"$" + price}
                                                                onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                        <Col lg={6} md={6} sm={12} xs={12} className="lot">
                                                            <label>Est. payment</label><br />
                                                            <input
                                                                name="payment"
                                                                value={"$" + payment}
                                                                onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {/* <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col> */}
                                            </Row>
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12} >
                                                    <div className="propdetail">
                                                        <label>Property Details</label><br />
                                                        <textarea
                                                            name="propertyDetail"
                                                            value={propertyDetail}
                                                            onChange={(e) => this.setState({ propertyDetail: e.target.value })}
                                                        />
                                                    </div>
                                                    {/* {
                                                        error && propertyDetail === "" ?
                                                            <div className="error">Please fill out this field.</div> : ""
                                                    } */}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12} className="detailright">
                                                    <div className="box5">
                                                        <label>Property Type</label>
                                                        <Row>
                                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                                <div
                                                                    className={propertyType === "House" ? "active" : ""}
                                                                    onClick={() =>
                                                                        this.setState({ propertyType: "House" })
                                                                    }
                                                                >
                                                                    <img
                                                                        src={checkCircle}
                                                                        alt="checkCircle"
                                                                        className="c"
                                                                    />
                                                                    <img
                                                                        alt="House"
                                                                        src={
                                                                            propertyType === "House" ?
                                                                                whiteHouse : blackHouse
                                                                        }
                                                                    />
                                                                    <p>House</p>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                                <div
                                                                    className={propertyType === "Condo" ? "active" : ""}
                                                                    onClick={() =>
                                                                        this.setState({ propertyType: "Condo" })
                                                                    }
                                                                >
                                                                    <img src={checkCircle}
                                                                        alt="checkCircle"
                                                                        className="c"
                                                                    />
                                                                    <img
                                                                        alt="Condo"
                                                                        src={
                                                                            propertyType === "Condo" ?
                                                                                whiteCondo : blackCondo
                                                                        }
                                                                    />
                                                                    <p>Condo</p>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                                <div
                                                                    className={
                                                                        propertyType === "Townhouse" ? "active" : ""
                                                                    }
                                                                    onClick={() =>
                                                                        this.setState({ propertyType: "Townhouse" })
                                                                    }
                                                                >
                                                                    <img
                                                                        src={checkCircle}
                                                                        alt="checkCircle"
                                                                        className="c"
                                                                    />
                                                                    <img
                                                                        alt="Townhouse"
                                                                        src={
                                                                            propertyType === "Townhouse" ?
                                                                                whiteTownHouse : blackTownHouse
                                                                        }
                                                                    />
                                                                    <p>Townhouse</p>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                                <div
                                                                    className={
                                                                        propertyType === "Multifamily" ? "active" : ""
                                                                    }
                                                                    onClick={() =>
                                                                        this.setState({ propertyType: "Multifamily" })
                                                                    }
                                                                >
                                                                    <img
                                                                        src={checkCircle}
                                                                        alt="checkCircle"
                                                                        className="c"
                                                                    />
                                                                    <img
                                                                        alt="Multifamily"
                                                                        src={
                                                                            propertyType === "Multifamily" ?
                                                                                whiteMultiFamily : blackMultiFamily
                                                                        }
                                                                    />
                                                                    <p>Multifamily</p>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                                <div
                                                                    className={propertyType === "Land" ? "active" : ""}
                                                                    onClick={() =>
                                                                        this.setState({ propertyType: "Land" })
                                                                    }
                                                                >
                                                                    <img src={checkCircle}
                                                                        alt="checkCircle"
                                                                        className="c"
                                                                    />
                                                                    <img
                                                                        alt="Land"
                                                                        src={
                                                                            propertyType === "Land" ?
                                                                                whiteLand : blackLand
                                                                        }
                                                                    />
                                                                    <p>Land</p>
                                                                </div>
                                                            </Col>
                                                            <Col lg={2} md={3} sm={4} xs={4}>
                                                                <div
                                                                    className={
                                                                        propertyType === "Otherhouse" ? "active" : ""
                                                                    }
                                                                    onClick={() =>
                                                                        this.setState({ propertyType: "Otherhouse" })
                                                                    }
                                                                >
                                                                    <img
                                                                        src={checkCircle}
                                                                        alt="checkCircle"
                                                                        className="c"
                                                                    />
                                                                    <img
                                                                        alt="Otherhouse"
                                                                        src={
                                                                            propertyType === "Otherhouse" ?
                                                                                whiteOtherHouse : blackOtherHouse
                                                                        }
                                                                    />
                                                                    <p>Otherhouse</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="bedbath">
                                                        <label>Bed</label><br />
                                                        <button
                                                            className={beds === 1 ? "active btn1" : "btn1"}
                                                            onClick={() => this.setState({ beds: 1 })}
                                                        >
                                                            1
                                                        </button>
                                                        <button
                                                            className={beds === 2 ? "active" : ""}
                                                            onClick={() => this.setState({ beds: 2 })}
                                                        >
                                                            2
                                                        </button>
                                                        <button
                                                            className={beds === 3 ? "active" : ""}
                                                            onClick={() => this.setState({ beds: 3 })}
                                                        >
                                                            3
                                                        </button>
                                                        <button
                                                            className={beds === 5 ? "active" : ""}
                                                            onClick={() => this.setState({ beds: 5 })}
                                                        >
                                                            4
                                                        </button>
                                                        <button
                                                            className={beds === 6 ? "active btn6" : "btn6"}
                                                            onClick={() => this.setState({ beds: 6 })}
                                                        >
                                                            +5
                                                        </button>
                                                    </div>
                                                    <div className="bedbath">
                                                        <label>Bath</label><br />
                                                        <button
                                                            className={baths === 1 ? "active btn1" : "btn1"}
                                                            onClick={() => this.setState({ baths: 1 })}
                                                        >
                                                            1
                                                        </button>
                                                        <button
                                                            className={baths === 2 ? "active" : ""}
                                                            onClick={() => this.setState({ baths: 2 })}
                                                        >
                                                            2
                                                        </button>
                                                        <button
                                                            className={baths === 3 ? "active" : ""}
                                                            onClick={() => this.setState({ baths: 3 })}
                                                        >
                                                            3
                                                        </button>
                                                        <button
                                                            className={baths === 5 ? "active" : ""}
                                                            onClick={() => this.setState({ baths: 5 })}
                                                        >
                                                            4
                                                        </button>
                                                        <button
                                                            className={baths === 6 ? "active btn6" : "btn6"}
                                                            onClick={() => this.setState({ baths: 6 })}
                                                        >
                                                            +5
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <div className="sqf">
                                                            <label>sqf</label><br />
                                                            <input
                                                                name="area"
                                                                value={area}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <div className="lot">
                                                            <label>lot</label><br />
                                                            <input
                                                                name="lot"
                                                                value={lot}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="sqf">
                                                            <label>Community</label><br />
                                                            <input name="community"
                                                                value={community}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        community: e.target.value
                                                                    })
                                                                }
                                                            />
                                                            {
                                                                error && community === "" ?
                                                                    <div className="error">
                                                                        Please fill out this field.
                                                                    </div> : ""
                                                            }
                                                        </div>
                                                        <div className="lot">
                                                            <label>Stories</label><br />
                                                            <input
                                                                name="stories"
                                                                value={stories}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="sqf">
                                                            <label>Year Build</label><br />
                                                            <input
                                                                type="number"
                                                                min="1900"
                                                                max="2099"
                                                                step="1"
                                                                value={this.state.buildDate}
                                                                onChange={(e) => this.setState({ buildDate: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="lot">
                                                            <label>HOA</label><br />
                                                            <input
                                                                name="HOA"
                                                                value={"$" + HOA}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="relatedWeb">
                                                        <label>Related website</label><br />
                                                        <input type="text" value={websiteUrl} placeholder="https://www.google.com/" onChange={this.handleUrl} /><br />
                                                    </div>

                                                    {/* {
                                                            error && websiteUrl === "" ?
                                                                <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                    {/* <div className="nearby">
                                                        <label>Nearby Schools</label><br />
                                                        <input
                                                            placeholder="Ps 183 Robert L Stevenson"
                                                            value={nearBySchools}
                                                            onChange={(e) =>
                                                                this.setState({
                                                                    nearBySchools: e.target.value
                                                                })
                                                            }
                                                        />
                                                        {
                                                            error && nearBySchools === "" ?
                                                                <div className="error">
                                                                    Please fill out this field.
                                                                </div> : ""
                                                        }
                                                        <button>
                                                            <img src={submitadd} alt="submitadd" />
                                                            Add more school
                                                        </button>
                                                    </div> */}


                                                    <div>
                                                        <button
                                                            className="back bak"
                                                            onClick={() => this.onTabChange('first')}
                                                        // onClick={() => {
                                                        //     this.setState({ key: "first" })
                                                        //     window.scrollTo(0, 0);
                                                        // }}
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            className="continue con"
                                                            onClick={() => this.onTabChange('third')}
                                                        // onClick={() => {
                                                        //     this.setState({ key: "third" })
                                                        //     window.scrollTo(0, 0);
                                                        // }}
                                                        >
                                                            Continue
                                                        </button>
                                                    </div>
                                                </Col>

                                            </Row>

                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Row>
                                    <Col lg={10} md={12} sm={12} xs={12} className="col">
                                        <div className="property">
                                            <p className="heading">Additional information</p>
                                        </div>
                                        <div className="detail">
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12} className="detailright">


                                                    <div>
                                                        <label>Interior Details
                                                                <i
                                                                className={this.state.interior ? "fa fa-minus" : "fa fa-plus"}
                                                                style={{ marginLeft: "20px" }}
                                                                onClick={() => this.setState({ interior: !this.state.interior, exteriorDropdown: false, utility: false })}
                                                            >
                                                            </i>
                                                        </label><br />
                                                        <div style={{ display: this.state.interior ? "block" : "none" }}>
                                                            <label>Appliances</label><br />
                                                            <Row>
                                                                <Col>

                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Dishwasher" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Dishwasher
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Dryer" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Dryer
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Freezer" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Freezer
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Garbage Disposer" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Garbage Disposer
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Microwave" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Microwave
                                                        <br />
                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Range/Oven" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Range/Oven
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Rafrigerator" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Rafrigerator
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="TrashCompactor" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Trash Compactor
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChange} value="Washer" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Washer
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                            {/* {
                                                            error && appliances.length < 1 ?
                                                                <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                            <label>
                                                                Basement
                                                        </label>
                                                            <div>
                                                                <Row>
                                                                    <Col>
                                                                        <input type="checkbox" onChange={this.handleCheckboxChangeBasement} value="Finished" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Finished
                                                        <br />
                                                                        <input type="checkbox" onChange={this.handleCheckboxChangeBasement} value="Partially Finished" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Partially Finished
                                                        <br />
                                                                    </Col>
                                                                    <Col>
                                                                        <input type="checkbox" onChange={this.handleCheckboxChangeBasement} value="Unfinished" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Unfinished
                                                        <br />
                                                                        <input type="checkbox" onChange={this.handleCheckboxChangeBasement} value="None" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />None
                                                        <br />
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                        {/* {
                                                            error && basement.length < 1 ?
                                                                <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                    </div>




                                                    <label>Utility Details
                                                                <i
                                                            className={this.state.utility ? "fa fa-minus" : "fa fa-plus"}
                                                            style={{ marginLeft: "20px" }}
                                                            onClick={() => this.setState({ utility: !this.state.utility, exteriorDropdown: false, interior: false })}
                                                        >
                                                        </i>
                                                    </label><br />
                                                    <div style={{ display: this.state.utility ? "block" : "none" }}>
                                                        <div>
                                                            <label>
                                                                Cooling Type
                                                        </label>
                                                            <Row>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Central" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Central
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Evaporative" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Evaporative
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Geothermal" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Geothermal
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Rafrigration" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Rafrigration
                                                        <br />
                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Solar" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Solar
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Wall" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Wall
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="Other" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Other
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeCoolingType} value="None" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />None
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* {
                                                        error && coolingType.length < 1 ?
                                                            <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                        <div>
                                                            <label>
                                                                Heating Type
                                                        </label>
                                                            <Row>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Baseboard" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Baseboard
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Forced Air" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Forced Air
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Geothermal" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Geothermal
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Heat Pump" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Heat Pump
                                                        <br />
                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Radiant" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Radiant
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Stove" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Stove
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Wall" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Wall
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeHeatingType} value="Other" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Other
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* {
                                                        error && heatingType.length < 1 ?
                                                            <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                        <div>
                                                            <label>
                                                                Floor Covering
                                                        </label>
                                                            <Row>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Carpet" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Carpet
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Concrete" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Concrete
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Hardwood" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Hardwood
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Laminate" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Laminate
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Linoleum / Vinyl" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Linoleum / Vinyl
                                                        <br />
                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Slate" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Slate
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Softwood" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Softwood
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Tile" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Tile
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeFloorCovering} value="Other" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Other
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    {/* {
                                                        error && floorCovering.length < 1 ?
                                                            <div className="error">Please fill out this
                                                                field.</div> : ""
                                                    } */}

                                                    <label>Exterior Details
                                                                <i
                                                            className={this.state.exteriorDropdown ? "fa fa-minus" : "fa fa-plus"}
                                                            style={{ marginLeft: "20px" }}
                                                            onClick={() => this.setState({ exteriorDropdown: !this.state.exteriorDropdown, utility: false, interior: false })}
                                                        >
                                                        </i>
                                                    </label><br />
                                                    <div style={{ display: this.state.exteriorDropdown ? "block" : "none" }}>
                                                        <div>
                                                            <label>
                                                                Exterior
                                                        </label>
                                                            <Row>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Bric" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Bric
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Cement / Concrete" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Cement / Concrete
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Composition" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Composition
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Metal" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Metal
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Shingle" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Shingle
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Stone" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Stone
                                                        <br />
                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Stuco" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Stuco
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Vinyl" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Vinyl
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Wood" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Wood
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Wood Products" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Wood Products
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeExterior} value="Other" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Other
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* {
                                                            error && exterior.length < 1 ?
                                                                <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                        <div>
                                                            <label>
                                                                OUTDOOR AMENITIES
                                                        </label>
                                                            <Row>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Balcony/patio" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Balcony/patio
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Barbecue area" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Barbecue area
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Deck" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Deck
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Dock" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Dock
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Fenced yard" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Fenced yard
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Garden" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Garden
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Greenhouse" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Greenhouse
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Hot tub/spa" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Hot tub/spa
                                                        <br />
                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Lawn" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Lawn
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Pond" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Pond
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Pool" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Pool
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Porch" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Porch
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="RV parking" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />RV parking
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Sauna" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Sauna
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Sprinkler system" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Sprinkler system
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeOutdoor} value="Waterfront" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Waterfront
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* {
                                                            error && outdoor.length < 1 ?
                                                                <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                        <div>
                                                            <label>
                                                                Parking
                                                        </label>
                                                            <Row>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeParking} value="Carpet" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Carport
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeParking} value="Garage - Attached" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Garage - Attached
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeParking} value="Garage - Detached" style={{ height: "15px", width: "15px", marginRight: "5px" }} />Garage - Detached
                                                        <br />

                                                                </Col>
                                                                <Col>
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeParking} value="Off-street" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />Off-street
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeParking} value="On-street" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />On-street
                                                        <br />
                                                                    <input type="checkbox" onChange={this.handleCheckboxChangeParking} value="None" style={{ height: "15px", width: "15px", marginLeft: "10px", marginRight: "5px" }} />None
                                                        <br />
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* {
                                                            error && parking.length < 1 ?
                                                                <div className="error">Please fill out this
                                                                field.</div> : ""
                                                        } */}
                                                    </div>
                                                    <div style={{ marginTop: "5%" }}>
                                                        <label>
                                                            Parking-Spaces
                                                            </label>
                                                        <br />
                                                        <input type="number" onChange={this.handleInputChange} name="parkingSpaces" value={parkingSpaces} /><br />
                                                    </div>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col lg={8} md={8} sm={12} xs={12} className="detailleft">

                                                    <div>
                                                        <div className="sqf">
                                                            <label>Interest</label><br />
                                                            <input
                                                                name="interest"
                                                                value={"$" + interest}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                        <div className="lot">
                                                            <label>Taxes</label><br />
                                                            <input
                                                                name="tax"
                                                                value={"$" + tax}
                                                                onChange={this.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mortgage">
                                                        <label>Mortgage Insurance</label><br />
                                                        <input
                                                            name="mortgage"
                                                            value={"$" + mortgage}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                    <div className="noise">
                                                        <label>Any noise level on outside</label><br />
                                                        <button
                                                            className="btn"
                                                            onClick={() => this.setState({ noiseLevel: "yes" })}
                                                        >
                                                            <img
                                                                alt="submitellipse"
                                                                className="submitellipse"
                                                                src={
                                                                    noiseLevel === "yes" ?
                                                                        submitellipseblue : submitellipse
                                                                }
                                                            />
                                                            Yes
                                                        </button>
                                                        <button
                                                            className="btn"
                                                            onClick={() => this.setState({ noiseLevel: "no" })}
                                                        >
                                                            <img
                                                                alt="submitellipseblue"
                                                                className="submitellipseblue"
                                                                src={
                                                                    noiseLevel === "no" ?
                                                                        submitellipseblue : submitellipse
                                                                }
                                                            />
                                                            N/A
                                                        </button>
                                                    </div>
                                                    <br />

                                                </Col>
                                                <Col lg={4} md={4} sm={12} xs={12} className="detailright"></Col>
                                            </Row> */}
                                            {
                                                propertySubmitted ?
                                                    <div className="submitted-success">{propertySubmitted}</div> : ""
                                            }
                                            {
                                                propertyNotSubmitted ?
                                                    <div className="submitted-error">{propertyNotSubmitted}</div> : ""
                                            }
                                            {
                                                (error
                                                    // && (community === "" || address === "" || uploadedPath === "" ||
                                                    // propertyDetail === "" || nearBySchools === "" || basement.length < 1
                                                    // || coolingType.length < 1 || heatingType.length < 1 || floorCovering.length < 1 || exterior.length < 1 || outdoor.length < 1
                                                    // || parking.length < 1 || dates.length < 1 || websiteUrl === "")
                                                ) ? (
                                                    <div className="submitted-error">
                                                        Please fill out all the fields.
                                                    </div>
                                                ) : ""
                                            }
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    <div style={{ marginTop: "5%" }}>
                                                        <button
                                                            className="back"
                                                            onClick={() => this.onTabChange('second')}
                                                        // onClick={() => this.setState({ key: "second" })}
                                                        >
                                                            Back
                                                        </button>
                                                        <button className="submit" onClick={this.submitProperty}>
                                                            {loader ? <Spinner animation="grow" /> : "Submit Property"}
                                                        </button>
                                                    </div>
                                                </Col>

                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            </div>
        )
    }
}

Submitproperty.defaultProps = googleMapStyles;
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE")
})(Submitproperty)
