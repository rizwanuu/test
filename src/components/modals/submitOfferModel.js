import React from 'react';
// import { Modal } from 'react-bootstrap';
import { Modal, Container, Row, Col, Tab, Spinner } from 'react-bootstrap';



class LoginModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            key: "first",
            value: false
        }

    }
    onTabChange = (tabKey) => {
        this.setState({ key: tabKey });
        window.scrollTo(0, 0);
    }

    render() {

        const { showModel, onHide } = this.props;
        const { key, value } = this.state;


        return (
            <Modal
                centered
                show={showModel}
                onHide={onHide}
                className="submitOffer-modal"
            >
                <Modal.Body>
                    <div className="main">
                        <Container className="submit">
                            <Tab.Container id="left-tabs-example" activeKey={key}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <h3 className="headings" style={{ marginBottom: "5%", textAlign: "center", fontSize: "26px" }}>Before we get started, have you seen this home in person?</h3><br />
                                        <button className="btn1">Yes, I have</button><br />
                                        <button className="btn1">No, I haven't</button>
                                        <div>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "second" })}
                                            >Next</button>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <h3 className="headings">Do you have an offer price in mind?</h3><br />
                                        <p className="headings">Nothing you enter here is final. You and your agent will determine what’s best for you.</p><br />
                                        <button className="btn1" onClick={() => this.setState({ value: true })}>Yes, I do</button><br />
                                        <div style={{ display: value ? "block" : "none" }} className="likeToOffer">
                                            <label>What would you like to offer? (optional)</label><br />
                                            <input type="text" placeholder="$0" /><br />
                                        </div>
                                        <button className="btn1" onClick={() => this.setState({ value: false })}>No, I'll decide with my Redfin Agent</button>
                                        <div>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "third" })}
                                            >Next</button>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "first" })}
                                                style={{ marginRight: "2%" }}
                                            >Back</button>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <h3 className="headings">How do you plan to pay for this home?</h3><br />
                                        <p className="headings">Nothing you enter here is final. You and your agent will determine what’s best for you.</p><br />
                                        <button className="btn1" onClick={() => this.setState({ value: true })}>Loan</button><br />
                                        <div style={{ display: value ? "block" : "none" }} className="likeToOffer">
                                            <label>Down Payment (optional)</label><br />
                                            <input type="text" placeholder="0%" /><br />
                                        </div>
                                        <button className="btn1" onClick={() => this.setState({ value: false })}>All cash</button><br />
                                        <button className="btn1" onClick={() => this.setState({ value: false })}>I'll decide with my Redfin Agent</button>

                                        <div>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "fourth" })}
                                            >Next</button>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "second" })}
                                                style={{ marginRight: "2%" }}
                                            >Back</button>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="fourth">
                                        <h3 className="headings">Tell us a little about yourself</h3><br />
                                        <div className="tellUs">
                                            <label>phone</label><br />
                                            <input type="text" /><br />
                                            <label>Is there anything else you want us to know before we talk? (optional)</label><br />
                                            <textarea placeholder="Feel free to tell us anything that you'd like." /> <br />
                                        </div>
                                        <div>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "fourth" })}
                                            >Submit</button>
                                            <button
                                                className="next"
                                                onClick={() => this.setState({ key: "third" })}
                                                style={{ marginRight: "2%" }}
                                            >Back</button>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>
        );

    }

}

export default LoginModal;
