import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Dashboard = () => {
  const [data, setData] = useState([]);

  function getData() {
    axios
      .get(
        "https://opensky-network.org/api/flights/all?begin=1682605907&end=1682609507"
      )
      .then((res) => {
        setData(res?.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="text-center ">
        <h1 className="my-5 ">Flights Details</h1>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">AIRPORT</th>
              <th scope="col">TIME</th>
              <th scope="col">ARRIVING</th>
              <th scope="col">DEPARTING</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{value.estArrivalAirport || "-"} </td>
                <td>{new Date(value?.lastSeen)?.toLocaleString() || "-"} </td>
                <td>{value.estArrivalAirport || "-"}</td>
                <td>{value.estDepartureAirport || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
