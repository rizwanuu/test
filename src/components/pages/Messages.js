import React, { useEffect, useState } from 'react';
import { ServerCallings } from '../../utils/ServerCallings';

export const Message1 = () => {

  let userName = localStorage.getItem("user");
  let userRoom = localStorage.getItem("pathname")?.split('/')[2]

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
      if (userRoom) {
        ServerCallings.receiveMessage(userRoom, (data) => {
          if (data) {
            setMessages(data)
          }
        })
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  const sendMessage = (e) => {
    e.preventDefault();
    setPostMessages({ message, userName, userRoom })
    console.log(postMessages)
    setMessage("")
  }


  return (
    <div className="messages">
      <div className="messageBox">
        <div className="chatbox__support" >
          <div className="chatbox__header">
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">{userName}</h4>
            </div>
          </div>
          <div className="chatbox__messages">
            <div>
              {
                messages.map((msgObject, index) => {
                  if (msgObject.user === userName) {
                    return <div key={index} className="messages__item messages__item--operator">{msgObject.msg}</div>
                  } else if (msgObject.user === "admin") {
                    return <div key={index} className="messages__item messages__item--visitor">{msgObject.msg}</div>
                  }
                  else {
                    return <div key={index} className="messages__item messages__item--visitor">{msgObject.msg}</div>
                  }
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
      </div>
    </div>
  );
};

// export const Message2 = () => {
//   return (
//     <div className='reports'>
//       <h1>message1</h1>
//     </div>
//   );
// };
