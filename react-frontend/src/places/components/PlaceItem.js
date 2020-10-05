import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/Hooks/http-hook";

import "./PlaceItem.css";

function PlaceItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);

  const [showConfirmModel, setshowConfirmModel] = useState(false);

  function openMapHnadler() {
    setShowMap(true);
  }

  function closeMapHnadler() {
    setShowMap(false);
  }

  const showDeleteWarningHandler = () => {
    setshowConfirmModel(true);
  };

  const cancelDeleteHandler = () => {
    setshowConfirmModel(false);
  };

  const confirmDelete = async () => {
    setshowConfirmModel(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        // process.env.REACT_APP_BACKEND_URL + "/places/" + `${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHnadler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHnadler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.cord} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModel}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDelete}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              // src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              src={props.image}
              alt={props.title}
            ></img>
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHnadler}>
              View on map!
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
