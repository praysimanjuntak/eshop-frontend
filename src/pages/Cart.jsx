// import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, tablet } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import Announcement from "../components/Announcement";
import { WEBSITE_LINK } from "../constants";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  flex: 1;
  display: flex;
  justify-content: center;
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
  ${tablet({
    flex: '1.5'
  })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  width: 200px;
  margin: 0;
  padding: 0;
  
  max-height: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

// const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = ({ user, isSignedIn, logout, items, setUser }) => {
  const [total, setTotal] = useState(0);
  const [cartObject, setCartObject] = useState({});
  const [saveCart, setSaveCart] = useState(false);
  const navigate = useNavigate();

  const handleDeleteCart = async () => {
    await setUser({
      email: user.email,
      name: user.name,
      joined: user.joined,
      cart: []
    })

    if (isSignedIn) {
      await fetch(`${WEBSITE_LINK}/delete-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          email: user.email
        })
      })
      .catch(console.log)
    }
  }

  const handleSaveCart = async () => {
    if (!isSignedIn) {
      navigate('/login');
    } else {
      console.log(user.cart)
      await fetch(`${WEBSITE_LINK}/store-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          email: user.email,
          carts: user.cart
        })
      })
      .then(resp => resp.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.log)
      setSaveCart(true);
    }
  }

  useEffect(() => {
    let total = 0;
    let tempCartObject = {}
    for (const product of user.cart) {
      for (const item of items) {
        if (item.id === product.item_id) {
          let tempObject = {};
          tempObject[item.id] = {
            title: item.title,
            price: item.price,
            image: item.image
          }
          tempCartObject = Object.assign({}, tempCartObject, tempObject);
          total += item.price * product.amount;
        }
      }
    }
    setTotal(total);
    setCartObject(tempCartObject);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Container>
      <Navbar logout={logout} isSignedIn={isSignedIn} user={user} />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to="/product-list/all" style={{flex: '1', display: 'flex', justifyContent: 'flex-start', marginRight: 'auto', textDecoration: 'none', color: 'inherit'}}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({user.cart.length})</TopText>
          </TopTexts>
          <div style={{flex: '1', marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <TopButton style={{marginRight: '15px'}} onClick={handleDeleteCart}>DELETE CART</TopButton>
            {!saveCart 
            ? <TopButton onClick={handleSaveCart} type="filled">SAVE CART</TopButton>
            : <TopButton style={{color: 'green', cursor: 'default'}} type="filled">CART SAVED</TopButton>}
          </div>
        </Top>
        <Bottom>
          <Info>
            {user.cart.length > 0 ? user.cart.map((product, index) => {
              return (
                  <Product key={index}>
                    <Hr />
                    <ProductDetail>
                      <Image src={cartObject[product.item_id]?.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {cartObject[product.item_id]?.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.item_id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>x{product.amount}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>$ {cartObject[product.item_id]?.price * product.amount}</ProductPrice>
                    </PriceDetail>
                  </Product>
              );
            }) : <SummaryTitle style={{padding: '10px 0'}}>You don't have anything in your cart.</SummaryTitle>}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {user.cart.length > 0 ? '2' : '0'}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice style={{color: 'green'}}>$ {user.cart.length > 0 ? '-2' : '0'}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
