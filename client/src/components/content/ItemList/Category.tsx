import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export type CategoryType = {
  id: number;
  name: string;
};

interface CategoryProps {
  onClick: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCategory: null | number;
}

function Category(props: CategoryProps) {
  const [category, setCategory] = useState<null | Array<CategoryType>>(null);

  useEffect(() => {
    axios.get(`/category`).then((res) => {
      setCategory(res.data);
    });
  }, []);
  const categoryButton = category?.map((eachType) => (
    <Button
      variant={
        eachType.id === props.selectedCategory ? "contained" : "outlined"
      }
      sx={{ m: 1, width: 100 }}
      key={eachType.id}
      onClick={() => props.onClick(eachType.id)}
    >
      {eachType.name}
    </Button>
  ));
  return (
    <>
      {categoryButton}
      <Button
        variant={props.selectedCategory ? "outlined" : "contained"}
        sx={{ m: 1, width: 100 }}
        key={-1}
        onClick={() => props.onClick(null)}
      >
        ALL
      </Button>
    </>
  );
}

export default Category;
