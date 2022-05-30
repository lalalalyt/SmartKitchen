// props: type, name, location

function Fridge(props) {
  const type = props.type==="R"? "Refridgerator" : "Freezer";   
  console.log("type",type)
  const {name, location} = props
  return (
      <li> 
          {type} - {name} - {location}
      </li>
  );
}

export default Fridge;
