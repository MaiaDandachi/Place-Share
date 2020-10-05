import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found, Maybe create one?</h2>
          <Button to="places/new">Share A Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            title={place.title}
            image={place.image}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            cord={place.location}
            onDelete={props.onDeletePlace}
          />
        );
      })}
    </ul>
  );
}

export default PlaceList;
