import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_USER_AUTH } from "../utils/Constants";
import useAuthHandler from "../utils/custom-hooks/AuthHandler";
import { getStoredUserAuth } from "../utils/Helpers";

export const authContext = React.createContext({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {}
});

const { Provider } = authContext;

const AuthProvider = ({ children }) => {
  const { auth, setAuthStatus, setUnauthStatus } = useAuthHandler(
    getStoredUserAuth()
  );

  return (
    <Provider value={{ auth, setAuthStatus, setUnauthStatus }}>
      {children}
    </Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthProvider;
