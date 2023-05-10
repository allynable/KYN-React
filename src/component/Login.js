import {Container, Form, Row, Col} from "react-bootstrap"

const Login = () => {
  return (
    <section>
        <Container>
            <Form>
                <Row className="justify-items-center">
                    <Col>
                    <Form.Group>
                      <Form.Label>
                        Email
                      </Form.Label>
                    </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    </section>
  )
}

export default Login