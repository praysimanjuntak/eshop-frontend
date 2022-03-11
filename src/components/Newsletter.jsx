import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useRef } from "react";
import emailjs from 'emailjs-com';

const Container = styled.div`
  height: 60vh;
  background-color: #ffeec2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.form`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const form = useRef();

  const onEmailChange = (event) => {
    setEmail(event?.target?.value);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAIL_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    setEmailSent(true);
  };
  
  return (
    <Container>
      <Title>Newsletter</Title>
        <Desc>Get timely updates from your favorite products.</Desc>
        <InputContainer ref={form} onSubmit={sendEmail}>
          <Input disabled={emailSent} value={email} onChange={onEmailChange} name="to_email" placeholder="Your email" />
          { !emailSent ? 
          <Button style={{cursor: 'pointer'}} type="submit">
            <Send />
          </Button> :
          <Button onClick={(e) => e.preventDefault()} style={{color: "rgba(0,0,128,0.5)"}}>
            <Send />
          </Button>}
        </InputContainer>
        { emailSent ? <Desc style={{color: 'green', fontWeight: 'bold', padding: '10px 0'}}>Thank you! We will update you so stay tuned!</Desc> : <></> }
    </Container>
  );
};

export default Newsletter;
