import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import { WEBSITE_LINK } from '../constants.js';
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.wepc.com/wp-content/uploads/2021/03/Custom-Water-Cooling-EKWB.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const LinkText = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = ({ loadUser, setIsSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const onEmailChange = (event) => {
    setEmail(event?.target?.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event?.target?.value);
  }

  const saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
    console.log('token inserted');
  }

  const onSubmitSignIn = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
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
              fetch(`${WEBSITE_LINK}/get-particular/${result.email}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': data.token
                }
              })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
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
                    loadUser(Object.assign({}, user, { cart: carts }));
                    setIsSignedIn(true);
                    navigate('/');
                  })
                }
              })
              .catch(console.log)
            }
          })
          .catch(console.log)
        } else {
          alert('Incorrect combination of email and password. Please try again.');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please fill in all the field.');
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input onChange={onEmailChange} placeholder="Email" />
          <Input type="password" onChange={onPasswordChange} placeholder="Password" />
          <Button onClick={onSubmitSignIn}>LOGIN</Button>
          {/* <LinkText><Link>DO NOT YOU REMEMBER THE PASSWORD?</Link></LinkText> */}
          <LinkText><Link style={{textDecoration: 'none', color: 'inherit'}} to="/register">CREATE A NEW ACCOUNT</Link></LinkText>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
