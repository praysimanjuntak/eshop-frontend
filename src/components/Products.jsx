import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ items, order, orderType }) => {
  return (
    <Container>
      {items ? items
      .filter((item) => {
        if (orderType === 'components') return item.type === orderType;
        else if (orderType === 'devices') return item.type === orderType;
        return true;
      })
      .sort((item1, item2) => {
        if (order === 'asc') return item1.price - item2.price;
        return item2.price - item1.price;
      })
      .map((item, id) => (
        <Product item={item} key={id} id={id} />
      )) : <></>}
    </Container>
  );
};

export default Products;
