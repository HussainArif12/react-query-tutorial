import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useFormik } from "formik";

function AddPassenger() {
  const formik = useFormik({
    initialValues: {
      name: "",
      trips: 0,
      airline: 1,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));

      mutation.mutate({
        name: values.name,
        trips: values.trips,
        airline: values.airline,
      });
    },
  });
  const mutation = useMutation((item) =>
    axios.post("https://api.instantwebtools.net/v1/passenger/", item)
  );
  if (mutation.isSuccess) console.log(mutation.data.data);
  if (mutation.isError) console.log(mutation.error);
  return (
    <div>
      <h1>Submit form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name
          <input id="name" type="text" onChange={formik.handleChange} />
        </label>
        <label>
          Trips
          <input id="trips" type="number" onChange={formik.handleChange} />
        </label>
        <label>
          Airline:
          <input id="airline" type="number" onChange={formik.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {mutation.isLoading && <p>Please wait</p>}
      {mutation.isSuccess && <p>Success! ID: {mutation.data.data._id}</p>}
      {mutation.isError && <p>Error!</p>}
    </div>
  );
}
export default AddPassenger;
