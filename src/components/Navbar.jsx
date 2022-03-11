import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import ShopLogo from '../images/shopLogo.png';
import { useEffect } from "react";

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2001;
  background: #fff;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  backgroud: white;
  justify-content: space-between;
  ${mobile({
    padding: "5px 0px"
  })}
`;

const Left = styled.div`
  display: flex;
  padding: 0px 10px;
  align-items: flex-start;
  ${mobile({
    flex: '1 0 100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  })}
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

// const Center = styled.div`
//   flex: 1;
//   text-align: center;
//   ${mobile({ display: "none" })}
// `;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 30px;
  padding: 0px 15px;
  align-items: center;
  ${mobile({ fontSize: "18px" })}
`;

const ItemsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flexBasis: '100%',
    flexDirection: 'column',
    background: 'white'
  })}
`

// const Right = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   ${mobile({
//     flexDirection: 'column',
//     alignItems: 'flex-end',
//     justifyContent: 'center'
//   })}
// `;

const Ham = styled.div`
  ${mobile({
    padding: '0 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '21px'
  })}
`

const Line = styled.span`
  ${mobile({
    height: '3px',
    width: '30px',
    backgroundColor: 'black',
    borderRadius: '10px'
  })}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ 
    marginLeft: '0',
    padding: '7px 0',
    marginRight: '40px',
    display: 'flex',
    fontSize: "20px",
    width: '100%',
    justifyContent: 'flex-end'
   })}
`;

const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])
  return width;
}

const Navbar = ({ user, isSignedIn, logout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const windowWidth = useWindowSize();
  const menuRef = useRef();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    menuRef.current.classList.toggle('active')
  }

  useEffect(() => {
    if (showMenu && windowWidth <= 760) {
      menuRef.current.style.display = "flex"
    } else if (!showMenu && windowWidth <= 760) {
      menuRef.current.style.display = "none"
    } else if (!showMenu && windowWidth > 760) {
      menuRef.current.style.display = "flex"
    }
  }, [showMenu, windowWidth])

  return (
    <Container>
      <Wrapper>
        <Left>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img style={{height: 'auto', width: 'auto', maxHeight: '40px', maxWidth: '40px'}} src={ShopLogo} alt="logo" />
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}><Logo>IM GameStore</Logo></Link>
          </div>
          <Ham onClick={handleShowMenu}>
            <Line></Line>
            <Line></Line>
            <Line></Line>
          </Ham>
        </Left>
        <ItemsWrap ref={menuRef}>
          {isSignedIn ?
          <>
            <MenuItem><Link style={{textDecoration: 'none', color: 'inherit'}} to="/my-profile">MY PROFILE</Link></MenuItem>
            <MenuItem onClick={logout}>LOGOUT</MenuItem>
          </> :
          <>
            <MenuItem><Link style={{textDecoration: 'none', color: 'inherit'}} to="/register">REGISTER</Link></MenuItem>
            <MenuItem><Link style={{textDecoration: 'none', color: 'inherit'}} to="/login">SIGN IN</Link></MenuItem>
          </>}
          <MenuItem>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to="/cart">
              {windowWidth > 760 
              ? <Badge badgeContent={user.cart.length} color="primary">
                <ShoppingCartOutlined />
              </Badge>
              : <MenuItem>My Cart ({user.cart.length > 0 ? user.cart.length : 0})</MenuItem>}
            </Link>
          </MenuItem>
        </ItemsWrap>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
