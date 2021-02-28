import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "90%",
  },
  rootCardActionArea: {},
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  skeleton: {
    height: "100%",
    minHeight: "120px",
  },
}));

const CardEnterprise = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { enterprise, skeleton, dispatch } = props;
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      className={classes.root}
      style={{
        margin: sm === false || skeleton ? "10px 10px" : "0px 0px",
        padding: 0,
      }}
      onClick={() => {
        if (!skeleton) {
          history.push("/enterprise/information/" + enterprise.enterprise_name);
          dispatch({
            type: "Enterprese_Select",
            enterpreseSelected: enterprise,
          });
        }
      }}
    >
      {skeleton ? (
        <Skeleton variant="rect" width={"100%"} className={classes.skeleton} />
      ) : (
        <>
          <CardMedia
            style={{
              maxWidth: sm === false ? "200px" : "100px",
              minWidth: sm === false ? "200px" : "100px",
            }}
            image={"https://empresas.ioasys.com.br/" + enterprise.photo}
            title="TITLE"
          />
          <CardActionArea className={classes.rootCardActionArea}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {enterprise.enterprise_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {enterprise.enterprise_type.enterprise_type_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`${enterprise.city} - ${enterprise.country}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </>
      )}
    </Card>
  );
};

export default CardEnterprise;
