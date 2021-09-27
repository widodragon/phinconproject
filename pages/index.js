import React from "react";
import Head from "next/head";
import Card from "@mui/material/Card";
import Link from "next/link";
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

const Dashboard = () => {
  const [currentList, setCurrentList] = React.useState(null);
  const [limit, setLimit] = React.useState(20);
  const [offset, setOffset] = React.useState(0);
  const [number, setNumber] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!currentList || currentList.length > 20) {
      getPokemonList(offset, limit);
    }
  }, [currentList]);

  const getPokemonList = async (newOffset, newLimit) => {
    setLoading(true);
    setOffset(newOffset);
    let data = await axios.get(
      `https://pokeapi.co/api/v2/item?offset=${newOffset}&limit=${newLimit}`
    );
    if (data) {
      if (newOffset === 0) {
        setCurrentList(data.data.results);
        setLoading(false);
      } else {
        let newArrList = currentList;
        newArrList.push(...data.data.results);
        setCurrentList(newArrList);
        setLoading(false);
      }
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const onLoadMore = () => {
    getPokemonList(offset + 20, 20);
    setNumber(number + 1);
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
              <Link href={`/detailPokemon?key=${item.url.split("/")[6]}`}>
                <Grid item xs={3} md={3} lg={3} key={index}>
                  <Item style={{ marginTop: 5 }}>
                    {" "}
                    <Card
                      sx={{
                        width: 150,
                        height: 200,
                        marginTop: 2,
                        boxShadow: `0.1px 0.1px 1px black`,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
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
                      </CardContent>
                    </Card>
                  </Item>
                </Grid>
              </Link>
            ))}
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              style={{
                backgroundColor: "grey",
                width: 140,
                height: 40,
                color: "white",
                marginTop: 15,
              }}
              onClick={() => onLoadMore()}
            >
              Load More
            </Button>
          )}
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
export default connect(mapStateToProps)(Dashboard);
