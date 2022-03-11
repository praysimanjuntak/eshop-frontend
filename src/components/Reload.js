import { WEBSITE_LINK } from '../constants';

const Reload = (loadUser, setIsSignedIn) => {
    fetch(`${WEBSITE_LINK}/sign-in`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
        }
    })
    .then(resp => resp.json())
    .then(result => {
        if (result && result.email) {
        fetch(`${WEBSITE_LINK}/get-particular/${result.email}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
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
                        email: user.email
                    })
                })
                .then(resp => resp.json())
                .then(carts => {
                    loadUser(Object.assign({}, user, { cart: carts }));
                    setIsSignedIn(true);
                })
            }
        })
        .catch(console.log)
        }
    })
    .catch(console.log)
}

export default Reload;