import Fridge from "./Fridge";

const List = [
  { id: 1, name: "Micky", location: "Montreal", type: "R", userId: 1 },
  { id: 2, name: "Minnie", location: "Montreal", type: "F", userId: 1 },
];

function FridgeList(props) {
  const list = List.map((each) => (
    <Fridge
      id={each.id}
      type={each.type}
      name={each.name}
      location={each.location}
    />
  ));
  return <ul>{list}</ul>;
}

export default FridgeList;
