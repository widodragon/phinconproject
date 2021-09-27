import React from "react";
import Head from "next/head";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import axios from "axios";

const DetailPokemon = () => {
  const [detail, setDetail] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [nickName, setNickName] = React.useState("");
  const router = useRouter();
  const { key } = router.query;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    if (!detail && key) {
      getPokemonDetail(key);
    }
  }, [detail, key]);

  const getPokemonDetail = async (newKey) => {
    setLoading(true);
    let data = await axios.get(`https://pokeapi.co/api/v2/item/${newKey}`);
    if (data) {
      setDetail(data.data);
      setLoading(false);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getPokemon = async () => {
    try {
      let data = await axios.post(`http://localhost:9090/api/v1/get-pokemon`, {
        name: detail.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.name}.png`,
        effect: detail.effect_entries[0].effect,
        category: detail.category.name,
      });
      if (data) {
        if (data.data.enable) {
          setOpen(true);
        } else {
          alert(data.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setNickName(event.target.value);
  };

  const addNickName = async () => {
    try {
      let data = await axios.post(
        `http://localhost:9090/api/v1/add-nickname?name=${detail.name}`,
        {
          nickName: nickName,
        }
      );
      if (data) {
        alert("success");
        router.push("/myPokemonList");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Head>
        <title>Pokemon Detail</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            placeholder="Please type nickname for pokemon!"
            type="text"
            value={nickName}
            onChange={handleChange}
            style={{ width: 390, height: 50, marginTop: 10 }}
          />
          <Button
            style={{
              backgroundColor: "grey",
              width: 140,
              height: 40,
              color: "white",
              marginTop: 15,
            }}
            onClick={() => addNickName()}
          >
            Submit
          </Button>
        </Box>
      </Modal>
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
          {detail && (
            <Grid item xs={6} md={6} lg={6}>
              <Item style={{ marginTop: 5 }}>
                {" "}
                <Card
                  sx={{
                    width: 200,
                    marginTop: 2,
                    boxShadow: `0.1px 0.1px 1px black`,
                  }}
                >
                  <CardMedia
                    component="img"
                    height={200}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${detail.name}.png`}
                    alt={detail.name}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h8"
                      component="div"
                      style={{
                        marginLeft: -3,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {detail.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {detail.effect_entries[0].effect}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ textAlign: "left", fontStyle: "italic" }}
                    >
                      Category : {detail.category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Item>
            </Grid>
          )}
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
              onClick={() => getPokemon()}
            >
              GET POKEMON
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
export default connect(mapStateToProps)(DetailPokemon);
