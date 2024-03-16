import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

export function ContactForm({data}) {
    const [formData, setFormData] = useState({
        name: '',
        fromEmail: '',
        message: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const [alertVariant, setAlertVariant] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://katie-hutchinson.com/email.php', formData);
            setAlertContent(response.data);
            setAlertVariant(response.status === 200 ? 'success' : 'danger');
            setShowAlert(true);
        } catch (error) {
            console.error('There was an error sending the form:', error);
            setAlertContent('There was an error sending the form. Please try again later. Please contact katie@katie-hutchinson.com');
            setAlertVariant('danger');
            setShowAlert(true);
        }
    };

    return (
      <Container>
          {data.title && (<h1>{data.title}</h1>)}
          {data.subtitle && (<h2>{data.subtitle}</h2>)}
          <Row className="justify-content-md-center">
              <Col md={6}>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            name="fromEmail"
                            value={formData.fromEmail}
                            onChange={handleChange}
                            placeholder="Enter your email"
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicMessage">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Enter your message"
                          />
                      </Form.Group>

                      <Button className="btn btn-contact" variant="primary" type="submit">
                          Send 😎
                      </Button>
                      {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                          {alertContent}
                      </Alert>}
                  </Form>
              </Col>
          </Row>


          <Container className="contact-links">
            <a href="mailto:katie@katie-hutchinson.com"><img src="img/email.png" padding="10px" height="50" alt="Email Katie"/></a><a href="https://www.linkedin.com/in/katie-hutchinson-9666a388/"><img src="img/linkedin.png" height="50" alt="Email Katie"/></a>
          </Container>
      </Container>
    );
}