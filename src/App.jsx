import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';
import './App.css';

function App() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    return (
        <div className="App">
            <h1>Marvel Comics Universe</h1>
            <CharacterList onCharacterSelect={setSelectedCharacter} />
            {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
        </div>
    );
}

export default App;
