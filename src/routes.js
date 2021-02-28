import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/Login";
import EmpresasPage from "./pages/Empresas";
import InfoEnterprise from "./pages/Empresas/InfoEnterprise";
import Page from "./components/Page";

const RoutePrivate = ({ title, component: Component, ...rest }) => {
  document.title = title;

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sigin" />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <div className="global">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Page {...props} component={LoginPage} title="Login" />
            )}
          />
          <Route
            path="/sigin"
            render={(props) => (
              <Page {...props} component={LoginPage} title="Login" />
            )}
          />
          <RoutePrivate
            path="/enterprises"
            component={EmpresasPage}
            title="Empresas"
          />
          <RoutePrivate
            path="/enterprise/information/:name"
            component={InfoEnterprise}
            title="Informação Empresa"
          />
          <Route component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
