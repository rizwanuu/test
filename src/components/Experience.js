import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';


import explinellipse from '../assets/images/e-linellipse.png'
import expiphone from '../assets/images/e-iphone.png'
import exphome from '../assets/images/e-home.png';
import expappstore from '../assets/images/e-appstore.png';
import expplaystore from '../assets/images/e-playstore.png';
import expblank from '../assets/images/e-blank.png';
import expsearch from '../assets/icons/e-search.png';
import expbuyer from '../assets/icons/e-buyer.png';
import expseller from '../assets/icons/e-seller.png';
import expfilter from '../assets/icons/e-filter.png';
import expproperty from '../assets/icons/e-property.png';
import expchat from '../assets/icons/e-chat.png';




class Experience extends React.Component {

    constructor() {
        super();

        this.state = {
            bolenBtn: false,
        }

    }
    handleBolen = (e) => {
        this.setState({ bolenBtn: !this.state.bolenBtn })
        // e.target.style.borderRadius = "8px 0 0 8px"
    }
    render() {
        const { bolenBtn } = this.state

        return (

            <div className="experience">
                <div className="to-see">
                    <Row className="m-0">
                        <Col lg={1} md={1} sm={1} xs={12}></Col>
                        <Col lg={5} md={5} sm={5} xs={12} style={{ position: "relative" }}>
                            <div className="experiencetalks">
                                <div>
                                    <h2>See how Eign can help</h2>
                                    <div className="subscribe-field">
                                        <div>
                                            <input type="text" placeholder="Email" />
                                        </div>
                                        <button>Subscribe</button>
                                    </div>
                                </div>
                            </div>
                            <div className="backimg" style={{ display: "none" }}>
                                <img src={exphome} alt="exphome" />
                            </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={12} className="p-0">
                            <div className="e-home">
                                <img src={exphome} alt="exphome" />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="bluebanner">
                    <Container>
                        <div className="btnclass">
                            <button style={{ borderRadius: "8px 0 0 8px" }} className={bolenBtn ? "sellerbtn" : "buyerbtn"} onClick={this.handleBolen}>Buyer</button>
                            <button style={{ borderRadius: "0 8px 8px 0" }} className={bolenBtn ? "buyerbtn" : "sellerbtn"} onClick={this.handleBolen}>Seller</button>
                        </div>
                        <Row className="m-0">
                            <Col lg={4} md={12} sm={12} xs={12} className="part1">
                                <div style={{ display: bolenBtn ? "none" : "block" }}>
                                    <Row className="m-0 search">
                                        <Col lg={9} md={9} sm={8} xs={8}>
                                            <p className="title" >Easy Search</p>
                                            <p className="description">Don’t need a account, you can explore whole app But if you want to add home, buy, sell.</p>
                                        </Col>
                                        <Col lg={3} md={3} sm={4} xs={4}>
                                            <div className="expproperty">
                                                <img src={expsearch} alt="expsearch" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="ellipseline">
                                        <img src={explinellipse} alt="explinellipse" />
                                    </Row>
                                    <Row className="m-0 search">
                                        <Col lg={9} md={9} sm={8} xs={8}>
                                            <p className="title">For Buyer</p>
                                            <p className="description">Don’t need a account, you can explore whole app But if you want to add home, buy, sell.</p>
                                        </Col>
                                        <Col lg={3} md={3} sm={4} xs={4}>
                                            <img src={expbuyer} alt="expbuyer" />
                                        </Col>
                                    </Row>
                                    <Row className="m-0 search">
                                        <Col lg={9} md={9} sm={8} xs={8}>
                                            <p className="title">For Seller</p>
                                            <p className="description">Don’t need a account, you can explore whole app But if you want to add home, buy, sell.</p>
                                        </Col>
                                        <Col lg={3} md={3} sm={4} xs={4}>
                                            <img src={expseller} alt="expseller" />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg={4} md={12} sm={12} xs={12} className="part2">
                                <img src={expiphone} alt="expiphone" />
                            </Col>
                            <Col lg={4} md={12} sm={12} xs={12} className="part3">
                                <div style={{ display: bolenBtn ? "block" : "none" }}>
                                    <Row className="m-0  search">
                                        <Col lg={3} md={3} sm={4} xs={4}>
                                            <img src={expfilter} alt="expfilter" />
                                        </Col>
                                        <Col lg={9} md={9} sm={8} xs={8}>
                                            <p className="title">Advance Filter</p>
                                            <p className="description">Don’t need a account, you can explore whole app But if you want to add home, buy, sell.</p>
                                        </Col>
                                    </Row>
                                    <Row className="m-0 search">
                                        <Col lg={3} md={3} sm={4} xs={4}>
                                            <div className="expproperty">
                                                <img src={expproperty} alt="expproperty" />
                                            </div>
                                        </Col>
                                        <Col lg={9} md={9} sm={8} xs={8}>
                                            <p className="title">Submit Proerty</p>
                                            <p className="description">Don’t need a account, you can explore whole app But if you want to add home, buy, sell.</p>
                                        </Col>
                                    </Row>
                                    <Row className="m-0 search">
                                        <Col lg={3} md={3} sm={4} xs={4}>
                                            <div className="expproperty">
                                                <img src={expchat} alt="expchat" />
                                            </div>
                                        </Col>
                                        <Col lg={9} md={9} sm={8} xs={8}>
                                            <p className="title">Chat with Buyer</p>
                                            <p className="description">Don’t need a account, you can explore whole app But if you want to add home, buy, sell.</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="downloadapp">
                    <Container>
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={12} className="downloadoption" style={{ position: "relative" }}>
                                <div >
                                    <p>Download the app with everything for free.</p>
                                    <img src={expappstore} alt="expappstore" className="expappstore" />
                                    <img src={expplaystore} alt="expplaystore" className="expplaystore" />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12}>
                                <img src={expblank} alt="expblank" className="expblank" />
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>

        );

    }
}

export default Experience;