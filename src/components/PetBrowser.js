import React from "react";

import Pet from "./Pet";

function PetBrowser({ pets, onClickHandleAdoption }) {
  const renderPets = pets.map(pet=> <Pet key={pet.id} pet={pet} onClickHandleAdoption={onClickHandleAdoption}  />)
  return <div className="ui cards">{renderPets}</div>;
}

export default PetBrowser;
