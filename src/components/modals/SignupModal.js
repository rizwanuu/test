import React from 'react';
import { Row, Col, Modal, Spinner } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

// import {NodeFetchHelper} from '../../utils/NodeFetchHelper';

// import logingoogle from '../../assets/icons/l-google.png';
import { ServerCallings } from "../../utils/ServerCallings";
// import {onHidden} from "web-vitals/dist/lib/onHidden";

let onHide = null;

class SignupModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            city: "",
            phone: "",
            state: "",
            email: "",
            country: "",
            zipCode: "",
            password: "",
            lastName: "",
            error: false,
            loader: false,
            firstName: "",
            repeatPassword: "",
            alreadyExists: "",
            accountCreated: "",
            onHide: props.onHide,
            goodone: false
        }

        onHide = props.onHide;
    }

    handlePhoneChange = (e) => {

        let value = e.target.value;

        if (!isNaN(value)) {
            this.setState({ phone: value })
        }
    }

    handleZipCodeChange = (e) => {

        let value = e.target.value.toString().toUpperCase();
        this.setState({ zipCode: value })

        // if (!isNaN(value)) {
        //     this.setState({zipCode: value})
        // }
    }

    signUp = () => {

        // const {welcomeMessage} = this.props;

        const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const {
            email, password, firstName, lastName, phone, country, state, city, zipCode, repeatPassword, error,
            //  loader
        } = this.state;

        if (email === "" || !emailRegExp.test(email) || password === "" || password.length < 8 || firstName === "" ||
            password !== repeatPassword || lastName === "" || phone === "" || phone.length < 10 || country === "" ||
            phone.length > 15 || state === "" || city === "" || zipCode === "" || zipCode.length < 6) {

            if (!error) {
                this.setState({ error: true })
            }

        } else {

            let body = {
                city: city,
                phone: phone,
                state: state,
                email: email,
                country: country,
                zip_code: zipCode,
                password: password,
                last_name: lastName,
                first_name: firstName,
                confirm_password: repeatPassword,
                name: firstName + " " + lastName,
            }

            // let url = "https://eign-backend.herokuapp.com/user/registration/";

            // if (!loader) {
            //     this.setState({ loader: true })
            // }

            // let check = false;

            // NodeFetchHelper.post(url, null, null, body, (status, data) => {
            //
            //     if (data && status === 200) {
            //         if (!Array.isArray(data?.email)) {
            //             check = true;
            //             localStorage.setItem("userDetail", JSON.stringify(data))
            //             this.setState({ accountCreated: "Account Created Successfully!", loader: false })
            //             setTimeout(() => this.setState({ accountCreated: "" }), 4000)
            //             setTimeout(welcomeMessage, 4000)
            //         }
            //         else if (Array.isArray(data?.email)) {
            //             check = true;
            //             this.setState({ alreadyExists: "Email already exists!", loader: false })
            //             setTimeout(() => this.setState({ alreadyExists: "" }), 4000)
            //         }
            //     }
            //     else if (data && status > 200) {
            //         check = true;
            //         this.setState({ alreadyExists: "Error!", loader: false })
            //         setTimeout(() => this.setState({ alreadyExists: "" }), 4000)
            //     }
            //     else if (!check) {
            //         check = false;
            //         this.setState({ alreadyExists: "Something went wrong!", loader: false })
            //         setTimeout(() => this.setState({ alreadyExists: "" }), 4000)
            //     }
            //
            //     // if (status && data) {
            //
            //     //     if (!Array.isArray(data?.email)) {
            //     //         localStorage.setItem("userDetail", JSON.stringify(data))
            //     //         this.setState({ accountCreated: "Account Created Successfully!", loader: false })
            //     //         setTimeout(() => this.setState({ accountCreated: "" }), 4000)
            //     //         setTimeout(welcomeMessage, 4000)
            //     //     }
            //     //     else {
            //     //         this.setState({ alreadyExists: "Email Already Exists!", loader: false })
            //     //         setTimeout(() => this.setState({ alreadyExists: "" }), 4000)
            //     //     }
            //
            //     // }
            //
            //     // if (loader) {
            //     //     this.setState({ loader: false })
            //     // }
            //
            // })

            this.setState({
                alreadyExists: "",
                accountCreated: "",
                loader: true
            })
            var done = false;
            ServerCallings.register(body, (data) => {
                console.log(data)
                if (!done) {
                    done = true;
                    if (data) {
                        if (data.response) {
                            console.log("1")
                            this.setState({
                                alreadyExists: "",
                                accountCreated: "Account Created Successfully!",
                                loader: false
                            })
                            localStorage.setItem("user", data.first_name)
                            localStorage.setItem("id", data.id)
                            this.props.welcomeMessage(data.first_name)

                            setTimeout(() => {
                                onHide();
                            }, 1500)
                        } else {
                            console.log("2")
                            this.setState({
                                alreadyExists: "Email Already Exists!",
                                accountCreated: "",
                                loader: false
                            })
                        }
                    } else {
                        console.log("3")
                        this.setState({ alreadyExists: "Something went wrong!", loader: false })
                        setTimeout(() => {
                            this.setState({
                                alreadyExists: "",
                                accountCreated: "",
                                loader: false
                            })
                        }
                            , 3000)
                    }
                }
            })

        }

    }
    responseGoogle = response => {
        let profile = response.profileObj
        let user1 = {
            name: profile.name
        }
        localStorage.setItem("user", user1.name)
        this.props.welcomeMessage(user1.name)
        this.props.action();
        setTimeout(() => {
            onHide();
        }, 1500)
    }

    componentClicked = () => {
        console.log("clicked");
    }
    responseFacebook = response => {
        let user = {
            name: response.name,
            token: response.accessToken,
        }
        localStorage.setItem("user",user.name)
        this.props.welcomeMessage(user.name)
        this.setState({
            goodone: true,
            userID: response.userID,
            userName: response.name,
            userEmail: response.email,
            userPicture: response.picture,
        })
        if(this.state.goodone){
            this.props.action();
        }
    }

    render() {

        const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const { show, onHide, hideSignUpShowLogin } = this.props;

        const {
            email, password, firstName, lastName, phone, country, state, city, zipCode,
            repeatPassword, error, loader, alreadyExists, accountCreated, goodone
        } = this.state;

        return (
            <Modal
                centered
                show={show}
                onHide={onHide}
                className="signup-modal"
            >

                <Modal.Body>
                    <div className="main">
                        <h1>Register now</h1>
                        <p className="title">Do you already have an account?
                            <span onClick={hideSignUpShowLogin}> Log in</span>
                        </p>
                        <GoogleLogin
                            clientId="716371097861-ljer49ti1n7s8g1dai93f7b2f4nbbbjt.apps.googleusercontent.com"
                            // buttonText="Login"
                            className="google"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        {/* <button className="google">
                            <img src={logingoogle} alt="logingoogle" className="logingoogle" />
                            Continue with Google
                        </button> */}
                         {
                            goodone ? (
                                <div>
                                    Login successful
                                    
                                </div>
                            ) : (
                                <FacebookLogin
                                    className="kep-login-facebook"
                                    textButton="Continue with FaceBook"
                                    icon="fa-facebook"
                                    appId="1649884398528490"
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={this.responseFacebook}
                                />)
                        }
                        {/* <button className="facebook">
                            <i className="fa fa-facebook"></i> Continue with Facebook
                        </button> */}
                    </div>
                    <p>or sign up with your email</p>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={12}>
                            <div className="namediv">
                                <input
                                    type="text"
                                    value={firstName}
                                    className="namebox"
                                    placeholder="First Name"
                                    onChange={(e) => this.setState({ firstName: e.target.value })}
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
                                    onChange={(e) => this.setState({ lastName: e.target.value })}
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
                    <div className="maildiv">
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            className="mailbox"
                            onChange={(e) => this.setState({ email: e.target.value })}
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
                    }
                    <div className="paswdiv">
                        <input
                            type="password"
                            value={password}
                            className="paswbox"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
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
                    }
                    <div className="paswdiv">
                        <input
                            type="password"
                            className="paswbox"
                            value={repeatPassword}
                            placeholder="Repeat Password"
                            onChange={(e) => this.setState({ repeatPassword: e.target.value })}
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
                    }
                    <div className="paswdiv">
                        <input
                            type="tel"
                            className="paswbox"
                            value={phone}
                            placeholder="Phone"
                            onChange={this.handlePhoneChange}
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
                                    onChange={(e) => this.setState({ city: e.target.value })}
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
                                    onChange={(e) => this.setState({ country: e.target.value })}
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
                                    onChange={(e) => this.setState({ state: e.target.value })}
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
                                    onChange={this.handleZipCodeChange}
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
                    <div className="showme">
                        {/* <label>
                            <input
                                type="checkbox"
                                defaultChecked={isStaff}
                                onChange={(e) => this.setState({ isStaff: e.target.checked })}
                            />
                            Is Staff?
                        </label> */}
                        <label>
                            <input type="checkbox" />
                            Eign can keep me informed with personalized emails about products or services.
                        </label>
                        <label>
                            <input type="checkbox" />
                            I have read and accept the <a href="/"> Terms and Conditions </a> and the
                            <a href="/"> Privacy Policies. </a>
                        </label>
                    </div>
                    {accountCreated ? <div className="success">{accountCreated}</div> : ""}
                    {alreadyExists ? <div className="error-already">{alreadyExists}</div> : ""}
                    <button className="loginbtn" onClick={this.signUp}>
                        {loader ? <Spinner animation="grow" /> : "Create Account"}
                    </button>
                </Modal.Body>

            </Modal>
        );

    }

}

export default SignupModal;
