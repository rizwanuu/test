import React from 'react';


import { Container, Row, Col, Tab } from 'react-bootstrap';




class Submitoffer extends React.Component {

    constructor() {
        super();

        this.state = {
            key: "one",
        }

    }

    render() {
        const { key } = this.state

        return (
            <div className="submitoffer">
                <Container className="submit" activeKey={key}>
                    <Tab.Container id="left-tabs-example">
                        <Tab.Content>
                            <Tab.Pane eventKey="one">
                                <Row>
                                    <Col xs={12} className="col">
                                        <h2>First, tell us about your offer</h2>
                                        <h2>First, tell us about your offer</h2>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Container>
            </div >
        )
    }
}
export default Submitoffer;