import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { WEBSITE_LINK } from "../constants";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.istockphoto.com/photos/mockup-blank-screen-laptop-on-desk-in-office-room-background-picture-id1149067560?k=20&m=1149067560&s=170667a&w=0&h=xVB119yvoFnadMRMcelySnSr15EmJ6Oej6qhsOx4WG8=")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = ({ loadUser, setIsSignedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasword, setConfirmPassword] = useState('');
  let navigate = useNavigate();

  const onNameChange = (event) => {
    setName(event?.target?.value);
  }

  const onEmailChange = (event) => {
    setEmail(event?.target?.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event?.target?.value);
  }

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event?.target?.value);
  }

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  const onSubmitSignUp = async (e) => {
    e.preventDefault()
    if (name && email && password) {
      if (password === confirmPasword) {
        try {
          const response = await fetch(`${WEBSITE_LINK}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
          })
          const data = await response.json();
          console.log(data);
          if (data && data.email) {
            const response = await fetch(`${WEBSITE_LINK}/sign-in`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  email: email,
                  password: password
              })
            })
            const data = await response.json();
            if (data.email && data.success === 'true') {
              saveAuthTokenInSession(data.token);
              console.log("HELLOO")
              fetch(`${WEBSITE_LINK}/sign-in`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': data.token
                }
              })
              .then(resp => resp.json())
              .then(result => {
                if (result && result.email) {
                  fetch(`${WEBSITE_LINK}/get-cart`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': window.sessionStorage.getItem('token')
                    },
                    body: JSON.stringify({
                      email: email
                    })
                  })
                  .then(resp => resp.json())
                  .then(carts => {
                    loadUser(Object.assign({}, result, { cart: carts }));
                    setIsSignedIn(true);
                    navigate('/');
                  })
                }
              })
              .catch(console.log)
            } else {
              alert('Incorrect combination of email and password. Please try again.');
            }
          } else {
            alert('Oops, unexpected error. Please make sure your email is not being used before.');
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert('Confirm Password is different');
      }
    } else {
      alert('Please fill in all the field.')
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input onChange={onNameChange} placeholder="Name" />
          <Input onChange={onEmailChange} placeholder="Email" />
          <Input onChange={onPasswordChange} type="password" placeholder="Password" />
          <Input onChange={onConfirmPasswordChange} type="password" placeholder="Confirm Password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={onSubmitSignUp}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
