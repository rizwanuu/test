import React, { useState, useEffect } from 'react';
import { ServerCallings } from '../../utils/ServerCallings';

import msgIcon from './assets/chatbox-icon.png';
import profileImg from './assets/image.png';



export default function Chat() {

    let userName = localStorage.getItem("user")
    let userLoginId = localStorage.getItem("id")
    let adminLoginId = localStorage.getItem("propertyOwnerId")
    let userRoom = adminLoginId + "_" + userLoginId;

    const [showChatBox, setShowChatBox] = useState(false);
    // const [userName, setUserName] = useState(name);
    // const [userRoom, setUserRoom] = useState(room);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [postMessages, setPostMessages] = useState({});

    useEffect(() => {
        ServerCallings.sendMessages(postMessages, (data) => {
            if (data) {
                setMessages(data)
            }
        })
    }, [postMessages])

    useEffect(() => {
        const interval = setInterval(() => {
            ServerCallings.receiveMessage(userRoom, (data) => {
                if (data) {
                    setMessages(data)
                    // console.log(data)
                }
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        setPostMessages({ message, userName, userRoom })
        setMessage("")
    }

    const showBox = () => {
        setShowChatBox(!showChatBox);
        ServerCallings.receiveMessage(userRoom, (data) => {
            if (data) {
                setMessages(data)
                console.log(data)
            }
        })

    }

    return (
        <div className="container">
            <div className="chatbox">
                <div className="chatbox__support" style={{ display: showChatBox ? "flex" : "none" }}>
                    <div className="chatbox__header">
                        <div className="chatbox__image--header">
                            <img src={profileImg} style={{
                                marginLeft: "-60px",
                                marginBottom: "10px"
                            }} alt="image" />
                        </div>
                        <div className="chatbox__content--header">
                            <h4 className="chatbox__heading--header">Chat support</h4>
                            <p className="chatbox__description--header">Lets talk to property owner</p>
                        </div>
                    </div>
                    <div className="chatbox__messages">
                        <div>
                            {
                                messages.map((msgObject, index) => {
                                    // if (msgObject.room === userRoom) {
                                        if (msgObject.user === userName) {
                                            console.log(msgObject.user , userName)
                                            return <div key={index} className="messages__item messages__item--operator">{msgObject.msg}</div>
                                        } else if (msgObject.user === "admin") {
                                            return <div key={index} className="messages__item messages__item--visitor">{msgObject.msg}</div>
                                        }
                                        else {
                                            return <div key={index} className="messages__item messages__item--visitor">{msgObject.msg}</div>
                                        }
                                    // }
                                })
                            }
                        </div>
                    </div>
                    <div className="chatbox__footer">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
                        />
                        <p className="chatbox__send--footer" onClick={(e) => sendMessage(e)}>Send</p>
                    </div>
                </div>
                <div className="chatbox__button" onClick={() => showBox()}>
                    <button><img src={msgIcon}
                        style={{
                            width: "60%"
                        }}
                    /></button>
                </div>
            </div>
        </div>
    );
}

