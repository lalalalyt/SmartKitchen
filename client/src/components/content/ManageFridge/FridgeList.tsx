import { Alert, Box, Button, Grid, List, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Fridge from "./Fridge";
import axios from "axios";
import Image from "mui-image";

import AddFridge from "./AddFridge";
import { FridgeContext } from "../../../contexts/FridgeContext.tsx";
import { UserContext } from "../../../contexts/UserContext";
import { flexbox } from "@mui/system";

interface FridgeListProps {
  onClick: () => void;
}

export type Fridge = {
  id: number;
  name: string;
  location: null | string;
  type: "R" | "F";
  user_id: number;
};

function FridgeList(props: FridgeListProps) {
  const { setFridgeType, setFridgeID } = useContext(FridgeContext);
  const { user } = useContext(UserContext);
  const [fridgeList, setFridgeList] = useState<[Fridge] | []>([]);
  const [error, setError] = useState(false);
  const list = fridgeList?.map((fridge) => (
    <Fridge
      onClick={() => {
        props.onClick();
        setFridgeID(fridge.id);
        setFridgeType(fridge.type);
      }}
      id={fridge.id}
      name={fridge.name}
      type={fridge.type as "R" | "F"}
    />
  ));

  useEffect(() => {
    axios.get(`/user/${user.id}`).then((res) => {
      setFridgeList(res.data);
    });
    setError(false);
  }, [user]);

  const sxHomePage = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Grid container sx={sxHomePage}>
      <Box sx={{ width: "35%", ml: "6vw", mt: "8vh" }}>
        <Image
          src="/image/fridge.jpg"
          width="33vw"
          height="33vw"
          style={{ borderRadius: 20 }}
          position="relative"
        />
      </Box>
      <Grid sx={{ width: "55%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "3%",
            pt: "10vh",
          }}
        >
          {error && (
            <Alert
              onClose={() => {
                setError(false);
              }}
              sx={{
                m: 3,
                boxShadow: 1,
                fontSize: 18,
                height: 45,
              }}
              severity="error"
            >
              Please login first!
            </Alert>
          )}
          <Typography variant="h5" sx={{ ml: "10vw" }}>
            Start to Manage Your Kitchen!
          </Typography>
          <AddFridge setFridgeList={setFridgeList} setError={setError} />
        </Box>

        {fridgeList.length > 0 && (
          <Grid container display="flex" justifyContent="center">
            {list}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default FridgeList;
