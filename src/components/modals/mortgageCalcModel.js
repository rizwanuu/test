import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';



class MortgageCalculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            homePrice: null,
            downPayment: null,
            percenValue: null,
        }

    }
    handleprice = (e) => {
        let value = e.target.value
        // this.setState({ [e.target.name]: e.target.value })
        let donwPaymentcalc = value / 5;
        let percentValuecalc = (donwPaymentcalc / value) * 100;
        this.setState({ homePrice: value, downPayment: donwPaymentcalc, percenValue: percentValuecalc })
    }
    render() {

        const { showCalculator, onHide } = this.props;
        const { homePrice, downPayment, percenValue } = this.state


        return (
            <Modal
                centered
                show={showCalculator}
                onHide={onHide}
                className="mortgageCalculator-modal"
            >
                <Modal.Body>
                    <div className="main">
                        <h3 className="heading">Mortgage Calculator</h3><br />
                        <p className="sub-heading">Estimate your mortgage payment, including the principal and interest, taxes, insurance, HOA, and PMI. Add your location for more accurate estimates.</p>
                        <Row>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <div className="calculator">
                                    <div className="calc-fields">
                                        <label>Home price</label><br />
                                        <input type="text" name="homePrice" onChange={this.handleprice} value={homePrice} placeholder="$465000" />
                                        <p>The amount you plan to offer for a home.</p>

                                        <label>Down payment</label><br />
                                        <input type="text" name="downPayment" onChange={this.handleprice} value={downPayment} placeholder="$45572" />
                                        <p>Cash you can pay when you close.</p>

                                        <label>Where are you buying</label><br />
                                        <input type="text" placeholder="City,neighborhood,or zip" />
                                        <p>To calculate local taxes and costs.</p>

                                        <label for="loanType">Loan type</label><br />
                                        <select name="loanType" id="loanType">
                                            <option value="30year">30 Year Fixed</option>
                                            <option value="15year">15 Year Fixed</option>
                                            <option value="ARM">5/1 ARM</option>
                                        </select>
                                        <p>Affects interest rates. 30- or 15-year loans are standard.</p>

                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12} xs={12}>
                                <div className="calculatorDetail">
                                    <h2>$2,572 per month</h2>
                                    <p>30 Year Fixed, 4.000% Interest </p>
                                    <div className="content">
                                        <span style={{ float: "left" }}>Principal and Interest</span>
                                        <span style={{ float: "right" }}>$2,131 (83%)</span>
                                    </div><br />
                                    <div className="content">
                                        <span style={{ float: "left" }}>Property Taxes</span>
                                        <span style={{ float: "right" }}>$248 (10%)</span>
                                    </div><br />
                                    <div className="content">
                                        <span style={{ float: "left" }}>Homeowner's Insurance</span>
                                        <span style={{ float: "right" }}>$248 (10%)</span>
                                    </div><br />
                                    <div className="content">
                                        <span style={{ float: "left" }}>Mortgage Insurance</span>
                                        <span style={{ float: "right" }}>$248 (10%)</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        );

    }

}

export default MortgageCalculator;
