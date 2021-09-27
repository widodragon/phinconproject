import React from "react";
import Head from "next/head";
import Card from "@mui/material/Card";
import Link from "next/link";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import axios from "axios";

const MyPokemonList = () => {
  const [currentList, setCurrentList] = React.useState(null);
  const [number, setNumber] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!currentList || currentList.length > 20) {
      getPokemonList();
    }
  }, [currentList]);

  const getPokemonList = async () => {
    setLoading(true);
    let data = await axios.get(`http://localhost:9090/api/v1/my-pokemon`);
    if (data) {
      setCurrentList(data.data);
      setLoading(false);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const autoRename = async (item) => {
    try {
      setLoading(true);
      let data = await axios.post(
        `http://localhost:9090/api/v1/rename?name=${item.name}`
      );
      if (data) {
        getPokemonList();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const releasePokemon = async (item) => {
    try {
      setLoading(true);
      let data = await axios.delete(
        `http://localhost:9090/api/v1/delete?name=${item.name}`
      );
      if (data) {
        if (data.data.enable) {
          getPokemonList();
          setLoading(false);
        } else {
          alert(data.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Pokemon List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          {currentList &&
            currentList.map((item, index) => (
              <Grid item xs={3} md={3} lg={3} key={index}>
                <Item style={{ marginTop: 5 }}>
                  {" "}
                  <Card
                    sx={{
                      width: 250,
                      height: "auto",
                      marginTop: 2,
                      boxShadow: `0.1px 0.1px 1px black`,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="auto"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h10"
                        component="div"
                        style={{ marginLeft: -3, textTransform: "uppercase" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h10"
                        component="div"
                        style={{ marginLeft: -3, textTransform: "uppercase" }}
                      >
                        Nickname : {item.nickName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => autoRename(item)}>
                        Auto Rename
                      </Button>
                      <Button size="small" onClick={() => releasePokemon(item)}>
                        Release
                      </Button>
                    </CardActions>
                  </Card>
                </Item>
              </Grid>
            ))}
        </div>
      </div>
      <style jsx>{``}</style>
    </div>
  );
};

const mapStateToProps = (state) => {
  let { rootReducer } = state;
  return {
    ...rootReducer,
  };
};
export default connect(mapStateToProps)(MyPokemonList);
