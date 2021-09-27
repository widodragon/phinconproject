import React from "react";
import { wrapper } from "../redux/index";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const [pagePosition, setPagePosition] = React.useState(0);
  const router = useRouter();

  return (
    <div>
      <Component {...pageProps} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          value={pagePosition}
          showLabels
          onChange={(event, newValue) => {
            if (newValue === 0) {
              router.push("/");
            } else if (newValue === 1) {
              router.push("/myPokemonList");
            }
            setPagePosition(newValue);
          }}
        >
          <BottomNavigationAction
            label="Pokemon List"
            icon={<DashboardIcon />}
          />
          <BottomNavigationAction label="Collection" icon={<SaveIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default wrapper.withRedux(MyApp);
