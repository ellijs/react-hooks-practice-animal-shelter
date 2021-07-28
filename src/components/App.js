import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(()=> {
    if(filters.type === "all") {
      fetch("http://localhost:3001/pets")
        .then(resp=> resp.json())
        .then(setPets)
    } else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
        .then(resp=> resp.json())
        .then(setPets)
    }
    }, [filters])


  function onChangeType(value) {
    setFilters({ type: value })
  }

  // WOW!!! WE Don't need This filter and render funtion if we FETCH whatever filter We Want!!!
  // const filteredPets = () => {
  //   if ( filters.type === "all" ) {
  //     return pets
  //   } else {
  //     const filteredPetList = [...pets]
  //     return filteredPetList.filter(pet => pet.type === filters.type)   
  //   }   
  // }

  function onClickHandleAdoption(id, adopted) {
  
      fetch(`http://localhost:3001/pets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({ "isAdopted": true })
      }).then(resp => resp.json()).then(console.log)

    const updatedPetStatus = [ ...pets ]
    updatedPetStatus.map(pet=> {
        if( pet.id === id) {
          pet.isAdopted = adopted
        } else {
          return true
        }
    })
    setPets(updatedPetStatus)
  }
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onClickHandleAdoption={onClickHandleAdoption}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
