import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export type CategoryType = {
  id: number;
  name: string;
};

interface CategoryProps {
  onClick: React.Dispatch<React.SetStateAction<number | null>>;
}

function Category(props: CategoryProps) {
  const [category, setCategory] = useState<null | Array<CategoryType>>(null);

  useEffect(() => {
    axios.get(`/category`).then((res) => {
      setCategory(res.data);
    });
  }, []);
  const categoryButton = category?.map((eachType) => (
    <Button key={eachType.id} onClick={() => props.onClick(eachType.id)}>
      {eachType.name}
    </Button>
  ));
  return <>{categoryButton}</>;
}

export default Category;
