import {Container, Row, Col, Image, Card, Form} from "react-bootstrap";
import defaultProfile from "../assets/img/profile.svg";
const Profile = (props) => {
  return (
    <section>
      <Container>
        <Row className="py-5 justify-content-center">
          <Col xs={12} sm={10} md={8}>
            <Card className="p-3 shadow-lg" style={{height: '200%%'}}>
              <Row>
                <Col xs={4} className="text-center">
                  <Image src={props.currentUser.imageUrl ? props.currentUser.imageUrl : defaultProfile} roundedCircle thumbnail className="profile-image"></Image>
                  <h5>{props.currentUser.userName}</h5>
                </Col>
                <Col xs={8}>
                  <h1 className="text-secondary">User Profile</h1>
                  <hr />
                  <Row className="py-2">
                    <Form.Label>Email:</Form.Label>
                    <h5>{props.currentUser.email}</h5>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Profile