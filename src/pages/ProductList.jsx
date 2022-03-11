import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = ({ items, user, isSignedIn, logout}) => {
  const [orderOption, setOrderOption] = useState('asc');
  const [orderType, setOrderType] = useState('');
  const { order } = useParams('');

  const handleOrderOption = (event) => {
    setOrderOption(event.target.value)
  }

  const handleOrderType = (event) => {
    setOrderType(event.target.value)
  }

  useEffect(() => {
    window.scroll(0,0);
    if (order === 'all') setOrderType('all')
    else if (order === 'components') setOrderType('components')
    else if (order === 'devices') setOrderType('devices')
    else setOrderType('all')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Announcement />
      <Navbar logout={logout} isSignedIn={isSignedIn} user={user}/>
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select value={orderType} onChange={handleOrderType}>
            <Option value="">All</Option>
            <Option value="components">Components</Option>
            <Option value="devices">Devices</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleOrderOption} value={orderOption} name="order">
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products items={items} order={orderOption} orderType={orderType} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
