import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import { ServerCallings } from '../../utils/ServerCallings';

export const EditProfile = (props) => {

  // const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [repeatPassword, setRepeatPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [state, setCountryState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [error, setError] = useState(false)
  const [loader1, setLoder1] = useState(false)
  const [loader2, setLoder2] = useState(false)
  const [accountCreated, setAccountCreated] = useState("")

  // const [body, setBody] = useState(null)


  useEffect(() => {

    props.history.push("/profile/editprofile")
    ServerCallings.editProfile(localStorage.getItem("id"), (data) => {
      setFirstName(data?.first_name);
      setLastName(data?.last_name);
      setPhone(data?.phone)
      setCity(data?.city)
      setCountry(data?.country)
      setCountryState(data?.state)
      setZipCode(data?.zip_code)
      setLoder1(false)
    })
    setLoder1(true)


  }, [])

  const submitChanges = (e) => {
    e.preventDefault();
    // console.log(props.history)
    let body = {
      phone: phone,
      zip_code: zipCode,
      first_name: firstName,
      last_name: lastName,
      city: city,
      country: country,
      state: state,
    }
    localStorage.setItem("user", firstName)
    let userId = localStorage.getItem("id");


    ServerCallings.sendEditProfileData(body, userId, (data) => {
      if (data) {
        console.log("1")
        console.log(data)
        setAccountCreated("Changes has been submitted!")
        setLoder2(false)
        setTimeout(() => {
          setAccountCreated("")
        }, 1500)
      } else {
        console.log("2")
        console.log(data)
        setAccountCreated("Something went wrong!")
        setLoder2(false)
        setTimeout(() => {
          setAccountCreated("")
        }, 1500)
      }
    })
    setLoder2(true)
  }


  const handlePhoneChange = (e) => {

    let value = e.target.value;

    if (!isNaN(value)) {
      setPhone(value)
    }
  }


  return (
    <div className='profiles'>
      <Form>
        {loader1 ? <h1>Loading...</h1> : ""}
        <h1>Edit Your Profile</h1>
        <Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={firstName}
                className="namebox"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <i className="fa fa-user nameimg" />
            </div>
            {
              error && firstName === "" ? (
                <div className="error">Please enter your first name.</div>
              ) : ""
            }
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={lastName}
                className="namebox"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <i className="fa fa-user nameimg" />
            </div>
            {
              error && lastName === "" ? (
                <div className="error">Please enter your last name.</div>
              ) : ""
            }
          </Col>
        </Row>

        {/* <div className="maildiv">
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="mailbox"
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="fa fa-envelope-square loginmail" />
        </div>
        {
          error ? (
            <div className="error">
              {
                email === "" ? "Please enter your email." :
                  !emailRegExp.test(email) ? "Email is not valid." : ""
              }
            </div>
          ) : ""
        } */}
        {/* <div className="paswdiv">
          <input
            type="password"
            value={password}
            className="paswbox"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="fa fa-lock loginpassword" />
        </div>
        {
          error ? (
            <div className="error">
              {
                password === "" ? "Please enter your password." :
                  password.length < 8 ? "Password must contain at least 8 characters."
                    : ""
              }
            </div>
          ) : ""
        } */}
        {/* <div className="paswdiv">
          <input
            type="password"
            className="paswbox"
            value={repeatPassword}
            placeholder="Repeat Password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <i className="fa fa-lock loginpassword" />
        </div>
        {
          error ? (
            <div className="error">
              {repeatPassword === "" ? "Please repeat your password." :
                password !== repeatPassword ? "Passwords does not match." : ""}
            </div>
          ) : ""
        } */}
        <div className="paswdiv">
          <input
            type="tel"
            className="paswbox"
            value={phone}
            placeholder="Phone"
            onChange={handlePhoneChange}
          />
          <i className="fa fa-phone loginpassword" />
        </div>
        {
          error ? (
            <div className="error">
              {phone === "" ? "Please enter your phone." :
                phone.length < 10 ? "Phone must contain at least 10 digits." :
                  phone.length > 15 ? "Phone must contain at most 15 digits." : ""}
            </div>
          ) : ""
        }
        <Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={city}
                className="namebox"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <i className="fa fa-building nameimg" />
            </div>
            {
              error && city === "" ? (
                <div className="error">Please enter your city.</div>
              ) : ""
            }
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={country}
                className="namebox"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <i className="fa fa-flag nameimg" />
            </div>
            {
              error && country === "" ? (
                <div className="error">Please enter your country.</div>
              ) : ""
            }
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={state}
                className="namebox"
                placeholder="State"
                onChange={(e) => setCountryState(e.target.value)}
              />
              <i className="fa fa-university nameimg" />
            </div>
            {
              error && state === "" ? (
                <div className="error">Please enter your state.</div>
              ) : ""
            }
          </Col>
          <Col lg={6} md={6} sm={6} xs={12}>
            <div className="namediv">
              <input
                type="text"
                value={zipCode}
                className="namebox"
                placeholder="Zip Code"
                onChange={(e) => setZipCode(e.target.value)}
              />
              <i className="fa fa-compass nameimg" />
            </div>
            {
              error ? (
                <div className="error">
                  {zipCode === "" ? "Please enter your zip code." :
                    zipCode.length < 6 ? "Zip Code must contain 6 digits." : ""}
                </div>
              ) : ""
            }
          </Col>
        </Row>
        {accountCreated ? <div className="success">{accountCreated}</div> : ""}
        {/* {alreadyExists ? <div className="error-already">{alreadyExists}</div> : ""} */}
        <button className="loginbtn" onClick={submitChanges}>
          {loader2 ? <Spinner animation="grow" /> : "Submit Changes"}
        </button>
      </Form>
    </div>
  );
};

export const ValidateProfile = () => {
  return (
    <div className='reports'>
      <h1>validateprofile</h1>
    </div>
  );
};
