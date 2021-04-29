import React from 'react';
import {Modal, Spinner} from 'react-bootstrap';

// import {NodeFetchHelper} from '../../utils/NodeFetchHelper';

// import logingoogle from '../../assets/icons/l-google.png';


import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {ServerCallings} from "../../utils/ServerCallings";


class LoginModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false,
            loader: false,
            showPassword: false,
            incorrectFields: "",
            loginSuccessful: "",

            goodone: false,
            userID: "",
            userName: "",
            userEmail: "",
            userPicture: "",
        }

    }

    login = () => {
        // const {welcomeMessage} = this.props;

        const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const {email, password, error,
            //  loader
            } = this.state;

        if (email === "" || !emailRegExp.test(email) || password === "" || password.length < 8) {

            if (!error) {
                this.setState({error: true})
            }
        } else {
            this.setState({loader: true})
            ServerCallings.login(email, password, (data) => {
                if (data) {
                    this.setState({
                        loginSuccessful: "Login Successful!",
                        loader: false,
                        incorrectFields: ""
                    }, () => {
                        // localStorage.setItem("userDetail", JSON.stringify(data))
                        localStorage.setItem("user", data.first_name)
                        localStorage.setItem("id", data.user_id)
                        this.props.welcomeMessage(data.first_name)
                        this.props.action()
                    })

                } else {
                    this.setState({
                        loginSuccessful: "",
                        loader: false,
                        incorrectFields: "Incorrect email or password!",
                    })
                }
            })

            // let body = {
            //     email: email,
            //     password: password
            // };
            //
            // let url = "https://eign-backend.herokuapp.com/user/login/";
            //
            // if (!loader) {
            //     this.setState({ loader: true })
            // }
            //
            // let check = false;
            //
            // NodeFetchHelper.post(url, null, null, body, (status, data) => {
            //
            //     if (data && status === 200) {
            //         if (!Array.isArray(data?.non_field_errors)) {
            //             check = true;
            //             localStorage.setItem("userDetail", JSON.stringify(data))
            //             this.setState({ loginSuccessful: "Login Successful!", loader: false })
            //             setTimeout(() => this.setState({ loginSuccessful: "" }), 4000)
            //             setTimeout(welcomeMessage, 4000)
            //         }
            //     }
            //     else if (data && status > 200) {
            //
            //         if (Array.isArray(data?.non_field_errors)) {
            //             check = true;
            //             this.setState({ loader: false, incorrectFields: "Incorrect email or password!" })
            //             setTimeout(() => this.setState({ incorrectFields: "" }), 4000)
            //         }
            //         else {
            //             check = true;
            //             this.setState({ loader: false, incorrectFields: "Error!" })
            //             setTimeout(() => this.setState({ incorrectFields: "" }), 4000)
            //         }
            //     }
            //     else if (!check) {
            //         check = false;
            //         this.setState({ loader: false, incorrectFields: "Something went wrong!" })
            //         setTimeout(() => this.setState({ incorrectFields: "" }), 4000)
            //     }
            //
            // })

        }

    }

    responseGoogle = response => {
        let profile = response.profileObj
        let user1 = {
            name: profile.name
        }
        localStorage.setItem("user",user1.name)
        this.props.welcomeMessage(user1.name)
        this.props.action();
    }
    componentClicked = () => {
        console.log("clicked");
    }
    responseFacebook = response => {
        console.log(response)
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

        const {show, onHide, hideLoginShowSignUp} = this.props;
        // console.log(show)

        const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const {email, password, error, loader, incorrectFields, loginSuccessful, showPassword, goodone} = this.state;
        // let Content;


        return (
            <Modal
                centered
                show={show}
                onHide={onHide}
                className="login-modal"
            >
                <Modal.Body>
                    <div className="main">
                        <h1>Login</h1>
                        <p>Don't have an account yet?
                            <span onClick={hideLoginShowSignUp}>Create it now</span>
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
                        {/* <button
                            className="facebook"

                        >
                            <i className="fa fa-facebook"></i>  Continue with Facebook
                        </button> */}
                    </div>
                    <p>or enter with your email</p>
                    <div className="maildiv">
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            className="mailbox"
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                        <i className="fa fa-envelope-square loginmail"/>
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
                            value={password}
                            className="paswbox"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <i className="fa fa-lock loginpassword"/>
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
                    <div className="showme">
                        <input type="checkbox"/><label>Remember me</label>
                        <span onClick={() => this.setState({showPassword: !showPassword})}>
                            {showPassword ? "Hide" : "Show"} password
                        </span>
                    </div>
                    {loginSuccessful ? <div className="success">{loginSuccessful}</div> : ""}
                    {incorrectFields ? <div className="error-incorrect">{incorrectFields}</div> : ""}
                    <button className="loginbtn" onClick={this.login}>
                        {loader ? <Spinner animation="grow"/> : "Log in"}
                    </button>
                    <p className="forget"><a href="/">Did you forget your password? </a></p>
                </Modal.Body>
            </Modal>
        );

    }

}

export default LoginModal;
