import styled from "styled-components";
import {mobile} from "../responsive";
// import { useState } from "react";
// import { WEBSITE_LINK } from '../constants.js';
// import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://emerging-europe.com/wp-content/uploads/2018/05/bigstock-fintech-icon-on-abstract-fina-209216539.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  margin: 5px 0px;
  font-size: 20px;
`

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
// `;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const MyProfile = ({ user }) => {
  return (
    <Container>
      <Wrapper>
        <Title>My Profile</Title>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
      </Wrapper>
    </Container>
  );
};

export default MyProfile;
