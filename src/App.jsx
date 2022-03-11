import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Reload from "./components/Reload";
import { WEBSITE_LINK } from "./constants";
import MyProfile from "./pages/MyProfile";

const initialUser = {
  email: '',
  name: '',
  joined: '',
  cart: []
}

const App = () => {
  const [user, setUser] = useState(initialUser);
  const [items, setItems] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  // let { order } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    setIsSignedIn(false);
    window.sessionStorage.removeItem('token');
    loadUser(initialUser);
    window.location.reload();
    if (location.pathname !== '/') {
      navigate('/');
    }
  }

  const loadUser = (data) => {
    setUser(data);
  }

  const AddToCart = async (id, amount) => {
    let idAlreadyInCart = false;
    let idInCart;
    let newAmount;
    user.cart.forEach((product) => {
      if (product.id === id) {
        idAlreadyInCart = true;
        idInCart = product.id;
        newAmount = product.amount + amount;
        console.log(idAlreadyInCart, idInCart, newAmount);
      }
    })
    let newUser;
    if (idAlreadyInCart) {
      let newCart = user.cart.filter((product) => {
        return product.id !== idInCart;
      })
      newCart.push({ item_id: idInCart, amount: newAmount });
      console.log(newCart);
      newUser = {
        email: user.email,
        name: user.name,
        joined: user.joined,
        cart: newCart
      }
    } else {
      newUser = {
        email: user.email,
        name: user.name,
        joined: user.joined,
        cart: [...user.cart, { item_id: id, amount }]
      }
    }
    await setUser(newUser);
    console.log(user);
  }

  const getItems = () => {
    fetch(`${WEBSITE_LINK}/get-item`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(result => {
      setItems(result);
    })
    .catch(console.log)
  }
  
  useEffect(() => {
    getItems();
    if (window.sessionStorage.getItem('token')) {
      Reload(loadUser, setIsSignedIn);
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home logout={logout} isSignedIn={isSignedIn} user={user} items={items} />}/>
        <Route path="/my-profile" element={<MyProfile user={user} />} />
        {items ? items.map((item) => {
          return <Route key={item.id} path={`/products/${item.id}`} element={<Product AddToCart={AddToCart} logout={logout} isSignedIn={isSignedIn} user={user} item={item} />}/>
        }) : <></>}
        <Route path="/product-list/:order" element={<ProductList logout={logout} isSignedIn={isSignedIn} user={user} items={items} />}/>
        <Route path="/register" element={<Register setIsSignedIn={setIsSignedIn} loadUser={loadUser} />}/>
        <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} loadUser={loadUser} />}/>
        <Route path="/cart" element={<Cart setUser={setUser} items={items} logout={logout} isSignedIn={isSignedIn} user={user} />}/>
      </Routes>
    </div>
  );
};

export default App;