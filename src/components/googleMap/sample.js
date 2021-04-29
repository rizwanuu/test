import React, { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import largeCircle from '../../assets/images/largeCircle.png';

const Marker = ({ children }) => children;
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE&callback=initMap&libraries=&v=weekly"
    async></script>
export default function Maps() {
    function addYourLocationButton(GoogleMapReact, Marker) {
        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'you_location_img';
        firstChild.appendChild(secondChild);

        // GoogleMapReact.addListener(GoogleMapReact, 'dragend', function () {
        //     document.getElementById("you_location_img").style.backgroundPosition = '0px 0px';
        // });

        firstChild.addEventListener('click', function () {
            var imgX = '0';
            var animationInterval = setInterval(function () {
                if (imgX == '-18') imgX = '0';
                else imgX = '-18';
                document.getElementById("you_location_img").style.backgroundPosition = imgX + '0px 0px';
            }, 500);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var latlng = GoogleMapReact.LatLng(position.coords.latitude, position.coords.longitude);
                    Marker.setPosition(latlng);
                    GoogleMapReact.setCenter(latlng);
                    clearInterval(animationInterval);
                    document.getElementById("you_location_img").style.backgroundPosition = '-144px 0px';
                });
            }
            else {
                clearInterval(animationInterval);
                document.getElementById("you_location_img").style.backgroundPosition = '0px 0px';
            }
        });

        controlDiv.index = 1;
        // GoogleMapReact.controls[GoogleMapReact.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }

    return (
        <div style={{ width: "900px", height: "400px" }}>
            {
                addYourLocationButton(GoogleMapReact, Marker)
            }
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCINbYXVulbSiJtl9-0kpWxykAHomB-JwE" }}
                center={{ lat: 31.4181, lng: 73.0776 }}
                defaultZoom={14}
                options={{ gestureHandling: "greedy" }}
            >
                <Marker
                    lat={31.4181}
                    lng={73.0776}
                >
                    <img src={largeCircle} alt="property doesn't exist" />
                </Marker>
            </GoogleMapReact>
        </div>
    );
}
