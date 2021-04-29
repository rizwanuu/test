import React, { Component } from 'react';

import { NavLink, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from '../assets/icons/logo.png';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            showLogin: false,
            showSignUp: false,
            selected: "English",
            languages: ["English", "German", "Russian", "Chinese", "Japanese", "Urdu", "Hindi"]
        }
        this.actionHandler = this.actionHandler.bind(this)
        this.Logout = this.Logout.bind(this)


    }

    componentDidMount() {
        const user = localStorage.getItem("user")
        if (user) {
            // if (!user.first_name)
            //     user.first_name = user['full name'].split(" ")[0]
            this.setState({ firstName: user ? user : '' });
        }
        // if ("geolocation" in navigator) {

        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         localStorage.setItem('lat', position.coords.latitude)
        //         localStorage.setItem('lng', position.coords.longitude)
        //     })
        // }
        // else {
        //     localStorage.setItem('lat', 43.651070)
        //     localStorage.setItem('lng', -79.347015)
        // }
    }

    handleChange = (event) => {

        this.setState({ selected: event.target.value });

    }
    actionHandler() {
        this.setState({ showLogin: false })
    }
    Logout() {
        localStorage.clear();
        this.setState({ firstName: '' })
        this.props.history.push("/")
    }

    welcomeMessage = (name) => {
        this.setState({ firstName: name });

        // const user = JSON.parse(localStorage.getItem("userDetail"))
        // user.first_name = user['full name'].split(" ")[0]
        // this.setState({[name]: false})

    }

    render() {

        const { showLogin, showSignUp, selected, languages, firstName } = this.state;

        return (
            <header className="header">
                <Navbar expand="lg">
                    <Navbar.Brand href="/" className="icon"><img src={logo} alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto mr-auto">
                            <NavLink to="/search" className="link" activeClassName="link active">Buy</NavLink>
                            {<NavLink to="/sell" className="link" activeClassName="link active">Sell</NavLink>}
                            <NavLink to="/experience" className="link"
                                activeClassName="link active">Experience</NavLink>
                            <NavLink to="/blog" className="link" activeClassName="link active">Blog</NavLink>
                            <NavLink to="/about" className="link" activeClassName="link active">About Us</NavLink>
                        </Nav>
                        <Nav className="ml-auto dir">
                            {/* <select className="select" defaultValue={selected} onChange={this.handleChange}>
                                {
                                    languages.map((language, index) => {
                                        return (<option key={index} value={language}>{language}</option>)
                                    })
                                }
                            </select> */}
                            {firstName ?
                                <NavDropdown title={firstName} id="nav-dropdown">
                                    <NavDropdown.Item onClick={this.Logout}>LogOut</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => window.location.href = "http://localhost:3001/"}>DashBoard</NavDropdown.Item>
                                </NavDropdown> :
                                // <div className="welcomeMessage">Hi {firstName}
                                // <button style={{marginLeft:'4px'}}>LogOut</button>
                                // </div> :
                                <button onClick={() => this.setState({ showLogin: true })}>Login</button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <LoginModal
                    show={showLogin}
                    action={this.actionHandler}
                    onHide={() => {
                        this.setState({ showLogin: false })
                    }}
                    welcomeMessage={this.welcomeMessage}
                    hideLoginShowSignUp={() => this.setState({ showLogin: false, showSignUp: true })}
                />
                <SignupModal
                    show={showSignUp}
                    onHide={() => this.setState({ showSignUp: false })}
                    welcomeMessage={this.welcomeMessage}
                    hideSignUpShowLogin={() => this.setState({ showLogin: true, showSignUp: false })}
                />
            </header>
        );

    }

}

export default withRouter(Header);
