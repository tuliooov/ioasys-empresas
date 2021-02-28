//REACT
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//FILES PROJECT
import { only_enterprise } from "../../services/requests";
import "./styles.css";
import AppBarToolBar from "../../components/AppBarToolBar";

//MATERIAL UI
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//icons
import CircularProgress from "@material-ui/core/CircularProgress";

//REDUX
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  console.log("theme", theme);
  return {
    boxCardEnterprise: {},
    container: {
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
        background: "rgba(255, 255, 255, 0.6)",
      },
    img: {
      marginTop: "10px",
      width: "100%",
      maxWidth: 500,
      borderRadius: 30,
    },
    name: {
      color: "#383743",
      fontFamily: "Roboto",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.95,
      letterSpacing: "-0.17px",
    },
    description: {
      // marginTop: 10,
      color: "#383743",
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: "-0.17px",
      padding: "0px",
    },
  };
});

const Empresas = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { name } = useParams();

  const { estado, dispatch } = props;
  const { enterpreseSelected } = estado;
  console.log("estado", enterpreseSelected);

  const md = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!enterpreseSelected.id) {
      buscarEmpresa();
    }
  }, []);

  const buscarEmpresa = async () => {
    try {
      const response = await only_enterprise(name);
      console.log(response);
      if (response?.errors?.length > 0) {
        console.log("error", response?.errors);
      } else {
        console.log("success");
        dispatch({
          type: "Enterprese_Select",
          enterpreseSelected: response.enterprises[0],
        });
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={!enterpreseSelected.id}>
        <CircularProgress color="secondary" size={80} />
      </Backdrop>

      <AppBarToolBar
        backPage={true}
        title={enterpreseSelected.enterprise_name}
      />

      <Container
        style={
          !md
            ? { flexDirection: "row", marginTop: "2rem" }
            : { flexDirection: "column" }
        }
        className={classes.container}
      >
        <img
          className={classes.img}
          src={"https://empresas.ioasys.com.br/" + enterpreseSelected.photo}
          alt={enterpreseSelected.enterprise_name}
        />
        <div
          style={
            !md ? { textAlign: "left", padding: "20px" } : { padding: "20px" }
          }
        >
          <Typography variant="h5" className={classes.name}>
            {enterpreseSelected.enterprise_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.city}>
            {enterpreseSelected.city} - {enterpreseSelected.country}
          </Typography>
          <Typography className={classes.description}>
            {enterpreseSelected.description}
          </Typography>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default connect((state) => ({ estado: state }))(Empresas);
