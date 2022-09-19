import { Alert, Box, List, Typography } from "@mui/material";
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
    <Fridge
      onClick={() => {
        props.onClick();
        setFridgeID(fridge.id);
        setFridgeType(fridge.type);
      }}
      key={fridge.id}
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

  return (
    <>
      {fridgeList.length > 0 && <List>{list}</List>}
      {error && (
        <Alert
          onClose={() => {
            setError(false);
          }}
          sx={{
            m: 3,
            ml: 10,
            boxShadow: 1,

            height: 30,
            width: 498,
          }}
          severity="error"
        >
          Please login first!
        </Alert>
      )}
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
    </>
  );
}

export default FridgeList;
