//REACT
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

//FILES PROJECT
import { sign_in } from "../../services/requests";
import "./styles.css";
import logo from "../../assets/logo-home.png";
import logo2 from "../../assets/logo-home@2x.png";
import logo3 from "../../assets/logo-home@3x.png";

//MATERIAL UI
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Backdrop from "@material-ui/core/Backdrop";

//icons
import CircularProgress from "@material-ui/core/CircularProgress";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InfoIcon from "@material-ui/icons/Info";

//REDUX
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  console.log("theme", theme);
  return {
    container: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 2rem",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
      background: "rgba(255, 255, 255, 0.6)",
    },
    margin: {
      margin: theme.spacing(1),
    },
    logo: {
      width: "18.438rem",
      height: "4.5rem",
      margin: "4rem 3rem 2rem",
      objectFit: "contain",
    },
    colorError: {
      color: theme.palette.error.main,
    },
    buttonAccess: {
      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.main} 90%)`,
      border: 0,
      borderRadius: 3,
      boxShadow: `0 3px 5px 2px ${theme.palette.primary.shadow}`,
      color: "white",
      height: 48,
      marginTop: "1rem",
      padding: "0 30px",
    },
    boxForm: {
      alignItems: "center",
      textAlign: "center",
    },
  };
});

const Login = ({ estado, dispatch }) => {
  const classes = useStyles();
  const history = useHistory();

  //useStates
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("enterprises");
    }
  });

  //handle's
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickSigIn = async () => {
    try {
      setLoading(true);
      const data = {
        email: values.username,
        password: values.password,
      };
      const response = await sign_in(data);
      console.log(response);
      if (response.success) {
        dispatch({
          type: "Update_User",
          user: response.investor,
        });
        history.push("enterprises");
      } else {
        setLoading(false);
        setErrors(response.errors);
      }
    } catch (error) {
      setLoading(false);
      setErrors(["Erro inesperado!"]);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" size={80} />
      </Backdrop>

      <img
        src={logo}
        srcSet={`${logo} 300w, ${logo2} 768w, ${logo3} 1280w`}
        alt="Logo Ioasys"
        className={classes.logo}
      />

      <Typography variant="h3" className="titleH3">
        BEM-VINDO AO EMPRESAS
      </Typography>

      <Typography variant="subtitle1" className="subTitleP">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt,
        ducimus.
      </Typography>

      <Box className={classes.boxForm}>
        <FormControl className={classes.margin} fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment" color={"secondary"}>
            Usuário
          </InputLabel>
          <Input
            value={values.username}
            color={"secondary"}
            id="input-with-icon-adornment"
            onChange={(e) => {
              if (errors.length) setErrors([]);
              setValues({ ...values, username: e.target.value });
            }}
            endAdornment={
              errors.length ? (
                <InputAdornment position="end">
                  <IconButton aria-label="Clique para trocar a visualização">
                    <InfoIcon color={"error"} />
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              )
            }
            startAdornment={
              <InputAdornment position="start">
                <MailOutlineOutlinedIcon color={"secondary"} />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl
          className={clsx(classes.margin, classes.textField)}
          fullWidth
        >
          <InputLabel htmlFor="standard-adornment-password" color={"secondary"}>
            Senha
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            color={"secondary"}
            onChange={(e) => {
              if (errors.length) setErrors([]);
              setValues({ ...values, password: e.target.value });
            }}
            startAdornment={
              <InputAdornment position="start">
                <LockOutlinedIcon color={"secondary"} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {errors.length ? (
                  <IconButton aria-label="Clique para trocar a visualização">
                    <InfoIcon color={"error"} />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="Clique para trocar a visualização"
                    onClick={handleClickShowPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>

        {errors.map((error, index) => (
          <Typography
            key={index}
            variant="subtitle1"
            className="errorMessageP"
            color={"error"}
          >
            - {error}
          </Typography>
        ))}

        <Button
          fullWidth
          disabled={errors.length ? true : false}
          style={
            errors.length
              ? { background: "gray", boxShadow: `0 3px 5px 2px gray` }
              : {}
          }
          className={classes.buttonAccess}
          onClick={handleClickSigIn}
        >
          ENTRAR
        </Button>
      </Box>
    </Container>
  );
};

export default connect((state) => ({ estado: state }))(Login);
