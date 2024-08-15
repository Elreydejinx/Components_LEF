import './CharacterDetail.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ character }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(
                    `https://gateway.marvel.com/v1/public/characters/${character.id}`,
                    {
                        params: {
                            ts: 1,
                            apikey: '61a85c0b3c756eff33873cd555b1479a',
                            hash: '6a3d4584202c9f4445c473c5013c1303',
                        },
                    }
                );
                setDetails(response.data.data.results[0]);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [character]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!details) return <div>Select a character to view details.</div>;

    return (
        <div className="character-detail">
            <img
                src={`${details.thumbnail.path}.${details.thumbnail.extension}`}
                alt={details.name}
            />
            <h2>{details.name}</h2>
            <p>{details.description || 'No description available.'}</p>
            <h3>Comics:</h3>
            <ul>
                {details.comics.items.map(comic => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;
