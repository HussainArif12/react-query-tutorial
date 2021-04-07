import { useState } from "react";
import { useQuery } from "react-query";
import { useFormik } from "formik";

function PassengerID() {
  const [id, setID] = useState("");
  const formik = useFormik({
    initialValues: {
      _id: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setID(values._id);
    },
  });
  const fetchPassenger = async (id) => {
    const res = await fetch(
      `https://api.instantwebtools.net/v1/passenger/${id}`
    );
    return res.json();
  };
  const { data, error, isLoading } = useQuery(["passengerID", id], () =>
    fetchPassenger(id)
  );
  return (
    <div>
      <h1>Find by ID</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="_id"
          name="_id"
          type="text"
          onChange={formik.handleChange}
        ></input>
      </form>
      {error && <p>Error!</p>}
      {data && (
        <p>
          {data.name}, {data.trips}
        </p>
      )}
      {isLoading && <p>Loading..</p>}
    </div>
  );
}

export default PassengerID;
