import './CharacterList.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = ({ onCharacterSelect }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(
                    'https://gateway.marvel.com/v1/public/characters',
                    {
                        params: {
                            ts: 1,
                            apikey: '61a85c0b3c756eff33873cd555b1479a',
                            hash: '6a3d4584202c9f4445c473c5013c1303',
                        },
                    }
                );
                setCharacters(response.data.data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="character-grid">
            {characters.map(character => (
                <div
                    key={character.id}
                    className="character-card"
                    onClick={() => onCharacterSelect(character)}
                >
                    <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                    />
                    <h3>{character.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
