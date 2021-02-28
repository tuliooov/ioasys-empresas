//REACT
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//FILES PROJECT
import { all_Enterprises } from "../../services/requests";
import "./styles.css";

import CardEnterprise from "./CardEnterprise";
import AppBarToolBar from "../../components/AppBarToolBar";

//MATERIAL UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import Grid from "@material-ui/core/Grid";

//icons
import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  console.log("theme", theme);
  return {
    boxCardEnterprise: {},
    container: {},
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
      background: "rgba(255, 255, 255, 0.6)",
    },
  };
});

const Enterprises = ({ estado, dispatch }) => {
  const classes = useStyles();
  const history = useHistory();

  const { enterprises } = estado;

  const [time] = useState(false);
  const [searchName, setSearchName] = useState("");

  const enterprisesFiltered = enterprises.filter((enterprise) =>
    enterprise.enterprise_name.toLowerCase().includes(searchName.toLowerCase())
  );

  useEffect(async () => {
    try {
      const response = await all_Enterprises();
      console.log(response);
      if (response?.errors?.length > 0) {
        console.log("error");
        localStorage.clear()
        history.push('/login')
        dispatch({
          type: "Enterpreses_Search",
          enterprises: [],
        });
      } else {
        console.log("success");
        dispatch({
          type: "Enterpreses_Search",
          enterprises: response.enterprises,
        });
      }
    } catch (error) {}
  }, []);

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={!enterprises.length}>
        <CircularProgress color="inherit" size={80} />
      </Backdrop>

      <AppBarToolBar setSearchName={setSearchName} searchName={searchName} />

      <Container className={classes.container}>
        {!enterprises.length || time ? (
          <Box my={3} className={classes.boxCardEnterprise}>
            <Grid container>
              {Array.from(new Array(10)).map((e, index) => (
                <Grid key={index} item={true} md={6} sm={12} xs={12}>
                  <CardEnterprise skeleton={true} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : enterprisesFiltered.length ? (
          <Box my={3} className={classes.boxCardEnterprise}>
            <Grid container>
              {enterprisesFiltered.map((enterprise, index) => (
                <Grid key={index} item={true} md={6} sm={12} xs={12}>
                  <CardEnterprise enterprise={enterprise} dispatch={dispatch} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box mt={5} style={{ textAlign: "center" }}>
            <Typography className="Nenhuma-empresa-foi">
              {" "}
              Nenhuma empresa foi encontrada para a busca realizada.{" "}
            </Typography>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
};

export default connect((state) => ({ estado: state }))(Enterprises);
