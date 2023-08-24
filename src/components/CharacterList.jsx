import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import "./CharacterList.css"; // Create this CSS file for styling

const API_BASE_URL = "https://rickandmortyapi.com/api/";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [statusOptions] = useState([
    { value: "", label: "All Status" },
    { value: "Alive", label: "Alive" },
    { value: "Dead", label: "Dead" },
    { value: "unknown", label: "Unknown" },
  ]);
  const [genderOptions] = useState([
    { value: "", label: "All Genders" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Genderless", label: "Genderless" },
    { value: "unknown", label: "Unknown" },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const fetchCharacters = async () => {
    const response = await axios.get(`${API_BASE_URL}character`, {
      params: {
        name: "",
        status: selectedStatus,
        gender: selectedGender,
      },
    });
    setCharacters(response.data.results);
    console.log(response.data);
  };

  useEffect(() => {
    fetchCharacters();
  }, [selectedStatus, selectedGender]);

  const handleStatusChange = (selected) => {
    setSelectedStatus(selected.value);
  };

  const handleGenderChange = (selected) => {
    setSelectedGender(selected.value);
  };

  return (
    <div className="character-list">
      <h1>Rick and Morty Characters</h1>
      <div className="filters">
        <Select
          options={statusOptions}
          value={statusOptions.find(
            (option) => option.value === selectedStatus
          )}
          onChange={handleStatusChange}
        />
        <Select
          options={genderOptions}
          value={genderOptions.find(
            (option) => option.value === selectedGender
          )}
          onChange={handleGenderChange}
        />
      </div>
      <div className="characters">
        {characters.map((character) => (
          <Link key={character.id} to={`/character/${character.id}`}>
            <div className="character-card">
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
