import { useState } from "react";
import { useQuery } from "react-query";

function Passengers() {
  const [page, setPage] = useState(0);

  const fetchPassengers = async (page) => {
    const res = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    return res.json();
  };

  const { isLoading, error, data, isSuccess } = useQuery(
    ["passengers", page],
    () => fetchPassengers(page),
    { keepPreviousData: false }
  );
  return (
    <div>
      <button onClick={() => setPage((old) => Math.max(0, old - 1))}>
        {" "}
        -{" "}
      </button>
      <button onClick={() => setPage((old) => old + 1)}> + </button>

      <p> {page} </p>
      {isSuccess &&
        data.data.map((item) => (
          <div key={item._id}>
            <p>{item.name}</p>
            <p>{item._id}</p>
          </div>
        ))}
      {isLoading && <p>Loading..</p>}
      {error && <p>Error occurred!</p>}
    </div>
  );
}

export default Passengers;
