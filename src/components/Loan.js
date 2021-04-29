import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import location from "../assets/icons/location.png";
import loanBlue from "../assets/images/loanblue.png";
import loanUnion from "../assets/images/loanUnion.png";

class Loan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutMortage: true,
      aboutTerms: false,
      aboutFinance: false,
    };
  }

  render() {
    const { aboutMortage, aboutTerms, aboutFinance } = this.state;
    return (
      <div className="loan">
        <Row className="m-0">
          <Col lg="1" md="1" sm="1" xs="1"></Col>
          <Col lg="11" md="11" sm="11" xs="11" className="p-0">
            <Row className="loan-need m-0">
              {/* <Col lg="1" md="1" sm="1" xs="1"></Col> */}
              <Col lg="5" md="5" sm="5" xs="12" className="search">
                <p>
                  Need a Loan?
                  <br />
                  Get pre-approved
                </p>
                <div className="search-field">
                  <div>
                    <img src={location} alt="location" />
                    <input type="text" placeholder="Manhattan, NY" />
                  </div>
                  <button>Search</button>
                </div>
              </Col>
              <Col lg="1" md="1" sm="1" xs="12"></Col>
              <Col lg="5" md="5" sm="5" xs="12">
                <img src={loanBlue} alt="loanBlue" className="loanBlue" />
              </Col>
              <Col lg="1" md="1" sm="1" xs="12"></Col>
            </Row>
          </Col>
        </Row>
        <Container>
          <Row className="cal-tabs">
            <Col xs={3} className="c">
              <div className="d">
                <img src={loanUnion} alt="loanUnion" className="loanUnion" />

                <h5>Mortgage Payment Calculator</h5>
                <p>
                  Check how much you will pay monthly based on current mortgage
                  rates and local average taxes.
                </p>
              </div>
              <div className="hrc"></div>
            </Col>
            <Col xs={3} className="c">
              <div className="d">
                <img src={loanUnion} alt="loanUnion" className="loanUnion" />
                <h5>
                  Mortgage
                  <br /> Calculator
                </h5>
                <p className="para">
                  Check how much you will pay monthly based on current mortgage
                  rates and local average taxes.
                </p>
              </div>
              <div className="hr"></div>
            </Col>
            <Col xs={3} className="c">
              <div className="d">
                <img src={loanUnion} alt="loanUnion" className="loanUnion" />
                <h5>
                  Loan 101
                  <br /> Guide
                </h5>
                <p className="para">
                  Check how much you will pay monthly based on current mortgage
                  rates and local average taxes.
                </p>
              </div>
              <div className="hr"></div>
            </Col>
          </Row>
          <Row className="m-0 loans">
            <Col xs={12} className="loan-options">
              <h4>Your Loan Options</h4>
            </Col>
            <Col xs={4}>
              <div className="loan-type">
                <h5>Loan Type</h5>
                <div>
                  <h4>30-Year </h4>
                  <p>he most common mortgage type</p>
                </div>
                <div>
                  <h4>10-Year </h4>
                  <p>
                    Payments are higher, but much less interest is paid over
                    time vs 10-yr loans
                  </p>
                </div>
                <div>
                  <h4>5/1 ARM</h4>
                  <p>
                    After 5 years, interest rate & mo. payment can change
                    annually
                  </p>
                </div>
                <div>
                  <h4>6/1 ARM</h4>
                  <p>
                    After 6years, interest rate & mo. payment can change
                    annually
                  </p>
                </div>
                <div>
                  <h4>VA 30-Year Fixed</h4>
                  <p>
                    PMI is not required for VA loans, but there may be a VA
                    funding fee
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={2}>
              <div className="main current-col">
                <h5>
                  Current Avg.
                  <br /> APR
                </h5>
                <div className="a">3.95%</div>
                <div className="b">3.95%</div>
                <div className="c">3.80%</div>
                <div className="d">3.33%</div>
                <div className="e">3.79%</div>
              </div>
            </Col>
            <Col xs={2}>
              <div className="main min-col">
                <h5>
                  Min. Down
                  <br /> Payment*
                </h5>
                <div className="a">3.95%</div>
                <div className="b">3.95%</div>
                <div className="c">3.0%</div>
                <div className="d">3.0%</div>
                <div className="e">0%</div>
              </div>
            </Col>
            <Col xs={4}>
              <div className="main best-col">
                <h5>Best for</h5>
                <p>
                  Low monthly payments
                  <br /> that won't change
                </p>
                <p>
                  Paying loan off faster
                  <br /> (vs 10-year loans)
                </p>
                <p>
                  Those who might sell
                  <br /> within 5 years
                </p>
                <p>
                  Qualifying veterans and
                  <br /> active military
                </p>
                <p>
                  Qualifying veterans and
                  <br /> active military
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="questionHeading">
              <h4>
                Frequently Asked
                <br /> Questions
              </h4>
            </Col>
          </Row>
          <div
            style={{
              background: "#FCFDFF",
              boxShadow: "0px 0px 50px rgba(180, 179, 179, 0.3)",
              borderRadius: "10px",
            }}
          >
            <Row className="askedQuestions">
              <Col>
                <div
                  className="mortage col1"
                  onClick={() =>
                    this.setState({
                      aboutMortage: !aboutMortage,
                      aboutTerms: false,
                      aboutFinance: false,
                    })
                  }
                >
                  <h5>
                    What is a Mortgage?
                    <i
                      className={
                        aboutMortage
                          ? "fa fa-chevron-circle-up"
                          : "fa fa-chevron-circle-down"
                      }
                      onClick={() =>
                        this.setState({
                          aboutMortage: !aboutMortage,
                          aboutTerms: false,
                          aboutFinance: false,
                        })
                      }
                    ></i>
                  </h5>
                  <p>
                    In a nutshell, a mortgage is a loan that enables you to
                    cover the cost of a home. Since you probably don't have
                    hundreds
                  </p>
                </div>
              </Col>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ display: aboutMortage ? "block" : "none" }}
              >
                <div className="box">
                  <h5>How To Get a Mortgage With Bad Credit?</h5>
                  <p>
                    In a nutshell, a mortgage is a loan that enables you to
                    cover the cost of a home. Since you
                    <br />
                    <span>probably don't have hundreds</span>
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    Unlike other investments, home sale profits benefit from
                    capital gains exemptions that you might qualify for under
                    some conditions, says Kyle White, an agent with Re/Max
                    Advantage Plus in Minneapolis–St. Paul.
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    The IRS gives each person, no matter how much that person
                    earns, a $250,000 tax-free exemption on capital gains from a
                    primary residence. You can exclude this capital gain from
                    your income permanently.
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    "So if you and your spouse buy your home for $100,000, and
                    years later sell for up to $600,000, you won't owe any
                    capital gains tax," says New York attorney Anthony S. Park.
                  </p>
                  <ul>
                    <li>The home must be your primary residence.</li>
                    <li>You must have owned it for at least two years.</li>
                    <li>
                      You must have lived in it for at least two of the past
                      five years.
                    </li>
                    <li>
                      You cannot have taken this exclusion in the past two
                      years.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row
              className="askedQuestions"
              onClick={() =>
                this.setState({
                  aboutTerms: !aboutTerms,
                  aboutMortage: false,
                  aboutFinance: false,
                })
              }
            >
              <Col>
                <div className="mortage col2">
                  <h5>
                    Mortgage Terms Explained, From ARMs to Points
                    <i
                      className={
                        aboutTerms
                          ? "fa fa-chevron-circle-up"
                          : "fa fa-chevron-circle-down"
                      }
                      onClick={() =>
                        this.setState({
                          aboutTerms: !aboutTerms,
                          aboutMortage: false,
                          aboutFinance: false,
                        })
                      }
                    ></i>
                  </h5>
                  <p>
                    In a nutshell, a mortgage is a loan that enables you to
                    cover the cost of a home. Since you probably don't have
                    hundreds
                  </p>
                </div>
              </Col>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ display: aboutTerms ? "block" : "none" }}
              >
                <div className="box">
                  <h5>How To Get a Mortgage With Bad Credit?</h5>
                  <p>
                    In a nutshell, a mortgage is a loan that enables you to
                    cover the cost of a home. Since you probably don't have
                    hundreds
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    Unlike other investments, home sale profits benefit from
                    capital gains exemptions that you might qualify for under
                    some conditions, says Kyle White, an agent with Re/Max
                    Advantage Plus in Minneapolis–St. Paul.
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    The IRS gives each person, no matter how much that person
                    earns, a $250,000 tax-free exemption on capital gains from a
                    primary residence. You can exclude this capital gain from
                    your income permanently.
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    "So if you and your spouse buy your home for $100,000, and
                    years later sell for up to $600,000, you won't owe any
                    capital gains tax," says New York attorney Anthony S. Park.
                  </p>
                  <ul>
                    <li>The home must be your primary residence.</li>
                    <li>You must have owned it for at least two years.</li>
                    <li>
                      You must have lived in it for at least two of the past
                      five years.
                    </li>
                    <li>
                      You cannot have taken this exclusion in the past two
                      years.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row
              className="askedQuestions"
              onClick={() =>
                this.setState({
                  aboutFinance: !aboutFinance,
                  aboutMortage: false,
                  aboutTerms: false,
                })
              }
            >
              <Col>
                <div className="mortage col3">
                  <h5>
                    Getting Your Finances In Order
                    <i
                      className={
                        aboutFinance
                          ? "fa fa-chevron-circle-up"
                          : "fa fa-chevron-circle-down"
                      }
                      onClick={() =>
                        this.setState({
                          aboutFinance: !aboutFinance,
                          aboutMortage: false,
                          aboutTerms: false,
                        })
                      }
                    ></i>
                  </h5>
                  <p>
                    In a nutshell, a mortgage is a loan that enables you to
                    cover the cost of a home. Since you probably don't have
                    hundreds
                  </p>
                </div>
              </Col>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ display: aboutFinance ? "block" : "none" }}
              >
                <div className="box">
                  <h5>How To Get a Mortgage With Bad Credit?</h5>
                  <p>
                    In a nutshell, a mortgage is a loan that enables you to
                    cover the cost of a home. Since you probably don't have
                    hundreds
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    Unlike other investments, home sale profits benefit from
                    capital gains exemptions that you might qualify for under
                    some conditions, says Kyle White, an agent with Re/Max
                    Advantage Plus in Minneapolis–St. Paul.
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    The IRS gives each person, no matter how much that person
                    earns, a $250,000 tax-free exemption on capital gains from a
                    primary residence. You can exclude this capital gain from
                    your income permanently.
                  </p>
                  <p style={{ paddingRight: "189px" }}>
                    "So if you and your spouse buy your home for $100,000, and
                    years later sell for up to $600,000, you won't owe any
                    capital gains tax," says New York attorney Anthony S. Park.
                  </p>
                  <ul>
                    <li>The home must be your primary residence.</li>
                    <li>You must have owned it for at least two years.</li>
                    <li>
                      You must have lived in it for at least two of the past
                      five years.
                    </li>
                    <li>
                      You cannot have taken this exclusion in the past two
                      years.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Loan;
