import { Alert, Box, Button, Grid, List, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Fridge from "./Fridge";
import axios from "axios";

import AddFridge from "./AddFridge";
import { FridgeContext } from "../../../contexts/FridgeContext.tsx";
import { UserContext } from "../../../contexts/UserContext";

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
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      key={fridge.id}
    >
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
    </Grid>
  ));

  useEffect(() => {
    axios.get(`/user/${user.id}`).then((res) => {
      setFridgeList(res.data);
    });
    setError(false);
  }, [user]);

  return (
    <Grid container>
      {fridgeList.length > 0 && (
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ m: 5 }}
        >
          {list}
        </Grid>
      )}
      {error && (
        <Alert
          onClose={() => {
            setError(false);
          }}
          sx={{
            m: 3,
            ml: 10,
            boxShadow: 1,
            fontSize: 18,
            height: 45,
            width: 498,
          }}
          severity="error"
        >
          Please login first!
        </Alert>
      )}
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            m: 3,
            ml: 10,
            boxShadow: 1,
            borderRadius: 5,
            height: 150,
            width: 530,
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ ml: 3 }}>
            Do you want to add a new fridge?
          </Typography>
          <AddFridge setFridgeList={setFridgeList} setError={setError} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default FridgeList;
