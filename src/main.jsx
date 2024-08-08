import ReactDOM from 'react-dom/client'
import Keycloak from "keycloak-js";
import store from "./redux/store.js";
import { updateUserInfo } from "./redux/actions/global.js";
import App from './App.jsx'
import './index.css'
import { Provider, useDispatch } from 'react-redux';

// console.log('import meta', import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID)
const kc = new Keycloak({
    clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID,
    realm: import.meta.env.VITE_APP_KEYCLOAK_REALM,
    url: import.meta.env.VITE_APP_KEYCLOAK_URL,
});

const render = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <Provider store={store}>
            <App />
        </Provider>,
    )
};

// kc.init({ onLoad: "login-required", checkLoginIframe: false }).then(
//     (authenticated) => {
//         if (authenticated) {
//             store.dispatch(updateUserInfo(kc.tokenParsed, kc));
//             render();
//         } else {
//             kc.login();
//         }
//     }
// );

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
)

