import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Manufacturer = styled.p`
  margin: 10px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

// const FilterContainer = styled.div`
//   width: 50%;
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const Filter = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `;

// const FilterColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   margin: 0px 5px;
//   cursor: pointer;
// `;

const Total = styled.p`
  margin: 10px 0;
`

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = ({ item, user, isSignedIn, logout, AddToCart}) => {
  const [amount, setAmount] = useState(1);

  const handleAmount = (prompt) => {
    if (prompt === 'add') {
      setAmount(amount + 1);
    } else {
      if (amount > 0) setAmount(amount - 1);
      else return;
    }
  }

  useEffect(() => {
    window.scroll(0,0);
  }, [])

  return (
    <Container>
      <Navbar logout={logout} isSignedIn={isSignedIn} user={user} />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={item.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{item.title}</Title>
          <Manufacturer>Manufacturer: {item.manufacturer}</Manufacturer>
          <Desc>
            {item.description}
          </Desc>
          <Price>$ {item.price}</Price>
          <AddContainer>
            <AmountContainer style={{margin: '10px 0'}}>
              {amount ? 
              (<Remove style={{cursor: 'pointer'}} onClick={() => handleAmount('minus')} />) :
              (<Remove style={{color: 'rgba(0,0,128,0.5)'}} />)}
              <Amount>{amount}</Amount>
              <Add style={{cursor: 'pointer'}} onClick={() => handleAmount('add')} />
              <Total style={{fontWeight: 'bold', color: 'inherit', marginLeft: '20px', fontSize: '1.2em'}}>Total: $ {amount*item.price}</Total>
            </AmountContainer>
          </AddContainer>
          {amount ? <Button onClick={() => AddToCart(item.id, amount)}>ADD TO CART</Button> :
          <Button style={{color: 'rgba(0,0,128,0.5)', cursor: 'default'}}>ADD TO CART</Button>}
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
