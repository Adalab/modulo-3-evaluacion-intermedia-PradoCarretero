import "../styles/App.scss";
import callToApi from "../services/api";
import { useEffect, useState } from "react";

function App() {
  const [phraseData, setPhraseData] = useState([]);
  const [newPhrase, setNewPhrase] = useState({
    quote: "",
    character: "",
  });

  useEffect(() => {
    callToApi().then((response) => {
      setPhraseData(response);
    });
  }, []);

  const htmlData = phraseData.map((any, index) => (
    <li key={index}>
      <p>{any.quote}</p>
      <p>{any.character}</p>
    </li>
  ));

  const handleNewPhrase = (ev) => {
    setNewPhrase({ ...newPhrase, [ev.target.id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setPhraseData([...phraseData, newPhrase]);
    setNewPhrase({
      quote: "",
      character: "",
    });
  };

  return (
    <>
      <h1>Frases de friends</h1>
      <ul>{htmlData}</ul>

      <h2>Añadir una nueva frase</h2>
      <form>
        <label htmlFor="phrase">Frase</label>
        <input
          onChange={handleNewPhrase}
          value={newPhrase.quote}
          type="text"
          name="phrase"
          id="quote"
        />
        <label htmlFor="character">Personaje</label>
        <input
          onChange={handleNewPhrase}
          value={newPhrase.character}
          type="text"
          name="character"
          id="character"
          label="personaje"
        />
        <input onClick={handleClick} type="submit" value="Añadir" />
      </form>
    </>
  );
}

export default App;
