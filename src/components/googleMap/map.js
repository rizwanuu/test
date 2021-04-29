import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import InfoWindow from "google-map-react";
import useSupercluster from "use-supercluster";
// import fetch from 'unfetch'
// import oneHouse from '../../assets/images/oneHouse.png';

// import redHeart from '../../assets/icons/red-heart.png';
// import heart from '../../assets/icons/heart.png';
// import sellCross from '../../assets/images/sell-cros.png';
import bed from '../../assets/icons/bed.png';
import bath from '../../assets/icons/bath.png';


import { Col, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { key } from "google-distance-matrix";

import { ServerCallings } from "../../utils/ServerCallings";

const Marker = ({ children }) => children;


export default function Maps(props) {
    var index = props.index;
    // const properties = props.mapProperties
    var points = []
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(7);
    const [properties, setProperties] = useState([]);
    // const [listProperty, setListProperty] = useState([]);
    const [selectedProperty, setselectedProperty] = useState(null);
    // const [radius, setRadius] = useState(100);
    const [show, setShow] = useState(0);
    // const [house, setHouse] = useState(oneHouse);
    const [open, setOpen] = useState(1);
    const [hide, setHide] = useState(false);
    const [newCenter, setNewCenter] = useState(false);
    const [center, setCenter] = useState({ lat: '', lng: '' });
    const [loader, setLoader] = useState(false);

    // const url = "https://eign-backend.herokuapp.com/property/list/";
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title: 'React POST Request Example' })
    // };

    useEffect(() => {
        // fetch(url, requestOptions).then(res => res.json()).then(data => {
        //     setProperties(data.eproperty)
        // });
        let model
        ServerCallings.getProperties(model, (data) => {
            if (data) {
                setProperties(data)
            }
        })

    }, [])


    if (properties.length !== 0) {
        points = properties.map(property => ({
            type: "Feature",
            properties: {
                cluster: false,
                propertyId: property.pk,
                price: property.fields.price,
                image_or_video: property.fields.image_or_video,
                beds: property.fields.beds,
                baths: property.fields.baths,
                home_address: property.fields.home_address,
                category: property.fields.category
            },
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(property.fields.location_long),
                    parseFloat(property.fields.location_lat)
                ]
            }
        }));
    }

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: {
            radius: 75,
            maxZoom: 15,
        }
    });


    useEffect(() => {
        const propertiesOnSelectedMapArea = [];
        // let clusteredProperties;

        for (let i = 0; i < clusters.length; i++) {
            properties.forEach(property => {
                if (property.pk === clusters[i].properties.propertyId) {
                    propertiesOnSelectedMapArea.push(property);
                }

            })
        }
        clusters.forEach(cluster => {
            if (cluster.id) {
                let clusteredProperties = supercluster.getLeaves(cluster.id);
                for (let i = 0; i < clusteredProperties.length; i++) {
                    properties.forEach(property => {
                        if (property.pk === clusteredProperties[i].properties.propertyId) {
                            propertiesOnSelectedMapArea.push(property);
                        }
                    })
                }
            }
        })
        // console.log(props.filterFuncValue)
        if (props.filterFuncValue.length === 0) {
            props.parentCallback(propertiesOnSelectedMapArea)
        } else {
            setProperties(props.filterFuncValue)
            props.parentCallback(props.filterFuncValue)
        }
    }, [clusters, properties])

    const apiIsLoaded = (map, maps, center) => {
        var circle = new maps.Circle({
            strokeColor: "#FFFFFF00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            strokeWidth: 1,
            fillColor: "#bdcde5",
            fillOpacity: 0.3,
            map,
            center: center,
            radius: 70,
        });
    };
    // const changeImage = (e) => {
    //     if (e.target.src === heart) {
    //         e.target.src = redHeart
    //     }
    //     else {
    //         e.target.src = heart
    //     }
    // }
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE" }}
            center={newCenter ? center : props.center}
            defaultZoom={props.zoomLevel ? props.zoomLevel : 7}
            options={{ gestureHandling: "greedy", styles: index.Style, minZoom: "14", maxZoom: "17" }}
            yesIWantToUseGoogleMapApiInternals
            key={`${props.zoomLevel}`}
            onGoogleApiLoaded={({ map, maps }) => {
                mapRef.current = map;
                apiIsLoaded(map, maps, props.center)
            }}
            onChange={({ zoom, bounds }) => {
                setZoom(zoom);
                setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat
                ]);
            }}
        >
            {/* {console.log(clusters)} */}
            {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                    cluster: isCluster,
                    point_count: pointCount
                } = cluster.properties;

                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            lat={latitude}
                            lng={longitude}
                        >
                            {supercluster.getLeaves(cluster.id).map(data =>
                                (data.properties.propertyId === props.mouseEnterId) ?
                                    <InfoWindow key={cluster.id}>
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "23px",
                                                marginLeft: "-10px",
                                                color: "#fff",
                                                background: "#2fc89b",
                                                fontSize: "12px",
                                                marginTop: "-23px",
                                                paddingTop: "20px",
                                                borderRadius: "10%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p>{props.mouseEnterId}</p>
                                        </div>
                                    </InfoWindow>
                                    :
                                    ''
                            )}

                            <div
                                style={{
                                    width: `${10 + (pointCount / points.length) * 20}px`,
                                    height: `${10 + (pointCount / points.length) * 20}px`,
                                    color: "#fff",
                                    background: "#1978c8",
                                    borderRadius: "50%",
                                    padding: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        20
                                    );
                                    mapRef.current.setZoom(expansionZoom);
                                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                                }}
                            >
                                {pointCount}
                            </div>
                        </Marker>
                    );
                } else {
                    return (
                        <Marker
                            key={`property-${cluster.properties.propertyId}`}
                            lat={latitude}
                            lng={longitude}
                        >
                            {/* {console.log(cluster.properties.propertyId + "  ==  " + props.mouseEnterId)} */}
                            <div
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    color: "#fff",
                                    background: open === cluster.properties.propertyId && hide || cluster.properties.propertyId === props.mouseEnterId ? "#2fc89b" : "white",
                                    borderRadius: "50%",
                                    boxShadow: "2px 2px 10px rgba(81, 81, 81, 0.4)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onClick={() => setselectedProperty(cluster, setShow(0), setHide(!hide), setNewCenter(true), setCenter({ lat: latitude, lng: longitude }), setOpen(cluster.properties.propertyId))}
                            // onMouseLeave={() => setTimeout(() => setHide(false), 2000)}
                            >
                                <div
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        color: "#1978c8",
                                        background: open === cluster.properties.propertyId && hide || cluster.properties.propertyId === props.mouseEnterId ? "white" : "#1978c8",
                                        borderRadius: "50%",
                                    }}
                                ></div>
                            </div>
                            {/* <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    outline: "none",
                                }}
                                onClick={() => setselectedProperty(cluster, setShow(0))}
                            >
                                <img src={house} alt="property icon"
                                    style={{
                                        width: "50px"
                                    }}
                                />
                            </button> */}
                        </Marker>
                    );
                }

            })}
            {
                selectedProperty && (
                    (show === 0) ?
                        <InfoWindow
                            lat={selectedProperty.geometry.coordinates[1]}
                            lng={selectedProperty.geometry.coordinates[0]}
                        >
                            <div
                                className="boxDiv"
                                style={{
                                    marginLeft: "-100px",
                                    marginTop: "-245px",
                                    display: hide ? "block" : "none",
                                    // transform: "translate(50px,100px)"
                                }}
                            >
                                <Col lg={6} md={6} sm={6} xs={12}>
                                    {
                                        <div className="mapBox">
                                            <Carousel className="img3">
                                                {
                                                    selectedProperty.properties.image_or_video?.split(',').map((item, index) => {
                                                        let ext = item.split('.').pop()
                                                        if (ext === 'jpeg' || ext === 'jpg' || ext === 'png') {
                                                            return <Carousel.Item key={index}>
                                                                <img className="itemimg" src={item} alt="i" />
                                                                <button className="now">New</button>
                                                                {/* <button
                                                                className="now"
                                                                onClick={() => setShow(1)}
                                                                style={{
                                                                    top: "5px",
                                                                    left: "173px",
                                                                    padding: "5px",
                                                                    borderRadius: "10px"
                                                                }}
                                                            >
                                                                <img
                                                                    src={sellCross}
                                                                    alt="sellCross"
                                                                    style={{
                                                                        width: "10px",
                                                                        height: "10px"
                                                                    }}
                                                                />
                                                            </button> */}
                                                                {/* <div className="heart">
                                                            <button>
                                                                <img src={heart} onClick={() => { changeImage() }} alt="heart" />
                                                            </button>
                                                        </div> */}
                                                            </Carousel.Item>
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </Carousel>
                                            <Link to={'/feature/' + selectedProperty.properties.propertyId}>
                                                <div className="details">
                                                    <div className="detail">
                                                        <span className="amount">${selectedProperty.properties.price}</span>
                                                        <span className="bed">
                                                            <img src={bed} alt="bed" width="22.92" height="12.82" />
                                                            <span>{selectedProperty.properties.beds} Bed</span>
                                                        </span>
                                                        <span className="bath">
                                                            <img src={bath} alt="bed" width="18.06" height="14.57" />
                                                            <span>{selectedProperty.properties.baths} Bath</span>
                                                        </span>
                                                    </div>
                                                    <p className="address">{selectedProperty.properties.home_address.split(",", 2)}....</p>
                                                </div>
                                            </Link>
                                        </div>
                                    }
                                </Col>
                            </div>
                        </InfoWindow> : null
                )
            }
        </GoogleMapReact >
    );
}
