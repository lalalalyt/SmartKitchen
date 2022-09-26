import { Button, Grid } from "@mui/material";

export type CategoryType = {
  id: number;
  name: string;
};

interface CategoryProps {
  onClick: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCategory: null | number;
  category: null | Array<CategoryType>;
}

function Category(props: CategoryProps) {
  const categoryButton = props.category?.map((eachType) => (
    <Button
      variant={
        eachType.id === props.selectedCategory ? "contained" : "outlined"
      }
      sx={{ m: 2, width: 100 }}
      key={eachType.id}
      onClick={() => props.onClick(eachType.id)}
    >
      {eachType.name}
    </Button>
  ));
  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      {categoryButton}
      <Button
        variant={props.selectedCategory ? "outlined" : "contained"}
        sx={{ m: 2, width: 100 }}
        key={-1}
        onClick={() => props.onClick(null)}
      >
        ALL
      </Button>
    </Grid>
  );
}

export default Category;
