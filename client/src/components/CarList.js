import React from "react";
import "./carList.css";
import useFetch from "../hooks/useFetch";

const CarList = () => {
  const { data, loading, error } = useFetch("/cars/bylocation");

  const images = [
    "https://sharetribe.imgix.net/5c6aae77-8bfa-446f-98b8-3c28a36f52c6/62c69278-2143-48e2-a536-eae85b53dd1c?auto=format&crop=edges&fit=crop&h=533&w=800&s=84a2aab46dd8e90e395dc046df7059ac",

    "https://sharetribe.imgix.net/5c6aae77-8bfa-446f-98b8-3c28a36f52c6/62c3f35d-03eb-4eca-82e6-04a065bcba57?auto=format&crop=edges&fit=crop&h=533&w=800&s=b9447cc2095931d8ed2eb6085b3f5e08",

    "https://sharetribe.imgix.net/5c6aae77-8bfa-446f-98b8-3c28a36f52c6/62c3f35d-03eb-4eca-82e6-04a065bcba57?auto=format&crop=edges&fit=crop&h=533&w=800&s=b9447cc2095931d8ed2eb6085b3f5e08",

    "https://sharetribe.imgix.net/5c6aae77-8bfa-446f-98b8-3c28a36f52c6/62c69278-2143-48e2-a536-eae85b53dd1c?auto=format&crop=edges&fit=crop&h=533&w=800&s=84a2aab46dd8e90e395dc046df7059ac",

    "https://sharetribe.imgix.net/5c6aae77-8bfa-446f-98b8-3c28a36f52c6/62c3f35d-03eb-4eca-82e6-04a065bcba57?auto=format&crop=edges&fit=crop&h=533&w=800&s=b9447cc2095931d8ed2eb6085b3f5e08",
  ];

  return (
    <div className="carList">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="carListItem" key={i}>
                <img src={img} className="carListImg" />

                <div className="carListTitles">
                  <h1>{data[i]?.location}</h1>
                  <h2>{data[i]?.count} cars</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default CarList;
