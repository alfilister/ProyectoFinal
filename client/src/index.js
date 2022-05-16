import App from "./App"
import React from "react"
import store from "./redux/store/index"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-1gu4jfv0.us.auth0.com"
          clientId="CQnqeax1QHDhSIgoK4gTbBR8y0SAxCrm"
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
