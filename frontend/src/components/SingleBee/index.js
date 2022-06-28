import { useEffect } from "react";

const SingleBee = ({ bee }) => {
  useEffect(() => {
    console.log(bee);
  }, [])

  return (
    <h1>{bee.name}</h1>
  );
}

export default SingleBee;
