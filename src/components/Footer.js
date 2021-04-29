import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import fimage from '../assets/images/footer-image.png';
import polygon from '../assets/icons/polygon.png';
import logo from '../assets/icons/logo.png';
import fb from '../assets/icons/fb.png';
import insta from '../assets/icons/insta.png';
import linkedin from '../assets/icons/linkedin.png';
import youtube from '../assets/icons/youtube.png';
import aboutphone from './../assets/images/a-phone.png';
import aboutmail from './../assets/images/a-mail.png';
import { ServerCallings } from '../utils/ServerCallings';


class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
        }
    }

    submitMail = () => {
        const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const { email } = this.state;
        let body = {
            email: email
        }

        if (email === "" || !emailRegExp.test(email)) {
            alert("please enter a valid email!")
        } else {
            ServerCallings.subscribeToNewsLetter(body, (data) => {
                console.log(data)
                alert(data.status)
                this.setState({email: ""})
            })
        }
        // console.log(this.state.email)
    }

    render() {

        const { email } = this.state
        const pathname = this?.props?.history?.location?.pathname;

        return (
            <footer className="footer">
                {
                    pathname === "/about" ? (
                        <div className="aboutinform">
                            <Container>
                                <Row className="m-0">
                                    <Col lg={12} md={12} sm={12} xs={12}>
                                        <p>
                                            If you want to make informed real estate decisions based
                                            on your needs and with a full understanding of current market,
                                            the EIGN app is the best tool out there! Call us or email us for more information.
                                            We look forward to hearing.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="m-0 contact">
                                    <Col lg={6} md={6} sm={12} xs={12} className="phone">
                                        <img src={aboutphone} alt="aboutphone" className="aboutphone" />
                                        <span>+88 1673 70 25 93</span>
                                    </Col>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                        <img src={aboutmail} alt="aboutmail" className="aboutmail" />
                                        <span>meeteign@email.com</span>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    ) : (
                        <div>
                            <div className="background">
                                <div className="container p-0">
                                    <Row className="m-0 background">
                                        <Col lg={6} md={6} sm={6} xs={12} className="footer-email">
                                            <div>
                                                <h3>Subscribe our newsroom, We will update you exicitng offer</h3>
                                                <p>Trust us we don’t spaming you.</p>
                                                <div className="es">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        placeholder="your email address"
                                                        onChange={(e) => this.setState({ email: e.target.value })}
                                                        onKeyPress={(e) => e.key === "Enter" ? this.submitMail() : null}
                                                    />
                                                    <button onClick={this.submitMail}>Submit</button>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col lg={6} md={6} sm={6} xs={12} className="footer-col">
                                            <div className="footer-image">
                                                <img src={fimage} alt="fimage" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="polygon">
                                <img src={polygon} alt="polyogn" />
                            </div>
                        </div>
                    )
                }

                <Container>
                    <Row>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <a href="/">
                                <img src={logo} alt="logo" width="132.12px" height="55px" />
                            </a>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div className="waterloo mt-2">
                                Waterloo, ON
                            </div>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div className="address mt-2">
                                2927  O Conner Street, Ocean Springs, Mississippi
                            </div>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div className="address mt-2">
                                P (555)619-202
                            </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}><hr className="hr" /></Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div>
                                <ul className="list p-0">
                                    <li className="company">Company</li>
                                    <li>About Us</li>
                                    <li>Careers</li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div>
                                <ul className="list p-0">
                                    <li className="company">Need Help</li>
                                    <li>Help Center</li>
                                    <li>Report a Bug</li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div>
                                <ul className="list p-0">
                                    <li className="company">Contact Us</li>
                                    <li>message@email.com</li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={6}>
                            <div>
                                <ul className="list p-0">
                                    <li className="company">Social</li>
                                    <li>
                                        <a href="/">
                                            <div><img src={fb} alt="fb" width="7.5px" height="15px" /></div>
                                        </a>
                                        <a href="/">
                                            <div><img src={insta} alt="insta" width="14px" height="14px" /></div>
                                        </a>
                                        <a href="/">
                                            <div><img src={linkedin} alt="linkedin" width="14px" height="14px" /></div>
                                        </a>
                                        <a href="/">
                                            <div><img src={youtube} alt="youtube" width="14.36px" height="10.17px" /></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <div className="copyright">
                        <div>
                            &copy; 2020 Eign
                        </div>
                        <div className="links">
                            <a href="/">Privacy</a>
                            <a href="/">Terms of Use</a>
                            <a href="/">Listings Quality Policy</a>
                        </div>
                    </div>
                </Container>
            </footer>
        );
    }

}

export default withRouter(Footer);