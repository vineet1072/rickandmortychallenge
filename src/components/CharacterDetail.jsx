import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CharacterDetail.css"; // Create this CSS file for styling

const API_BASE_URL = "https://rickandmortyapi.com/api/";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const fetchCharacter = async () => {
    const response = await axios.get(`${API_BASE_URL}character/${id}`);
    setCharacter(response.data);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className="character-detail">
      {character && (
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          {/* Add other details */}
        </div>
      )}
    </div>
  );
}

export default CharacterDetail;
