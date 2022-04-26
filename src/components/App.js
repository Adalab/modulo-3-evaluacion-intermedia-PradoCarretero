import "../styles/App.scss";
import callToApi from "../services/api";
import { useEffect, useState } from "react";

function App() {
  const [quoteData, setQuoteData] = useState([]);
  const [searchQuote, setSearchQuote] = useState("");
  const [searchCharacter, setSearchCharacter] = useState("");
  const [newQuote, setNewQuote] = useState({
    quote: "",
    character: "",
  });

  useEffect(() => {
    callToApi().then((response) => {
      setQuoteData(response);
    });
  }, []);

  const htmlData = quoteData
    .filter((any) =>
      any.quote.toLowerCase().includes(searchQuote.toLowerCase())
    )

    .filter((any) =>
      any.character.toLowerCase().includes(searchCharacter.toLowerCase())
    )

    .map((any, index) => (
      <li key={index}>
        <p>{any.quote}</p>
        <p>{any.character}</p>
      </li>
    ));

  const handleNewQuote = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setQuoteData([...quoteData, newQuote]);
    setNewQuote({
      quote: "",
      character: "",
    });
  };

  const handleSearchCharacter = (ev) => {
    setSearchCharacter(ev.target.value);
  };

  const handleSearchQuote = (ev) => {
    setSearchQuote(ev.target.value);
  };

  return (
    <>
      <h1>Frases de friends</h1>
      <form>
        <label htmlFor="searchQuote">Filtrar por frase</label>
        <input
          onChange={handleSearchQuote}
          value={searchQuote}
          type="text"
          name="searchQuote"
          id="searchQuote"
        />
        <label htmlFor="searchCharacter">Filtrar por personaje</label>
        {/*     <input
          onChange={handleSearchCharacter}
          value={searchCharacter}
          type="text"
          name="searchCharacter"
          id="searchCharacter"
          label="searchCharacter"
        /> */}

        <select
          name="searchCharacter"
          id="searchCharacter"
          onChange={handleSearchCharacter}
        >
          <option value="">Todos</option>
          <option>Ross</option>
          <option>Monica</option>
          <option>Joey</option>
          <option>Phoebe</option>
          <option>Chandler</option>
          <option>Rachel</option>
        </select>
      </form>

      <ul>{htmlData}</ul>

      <h2>Añadir una nueva frase</h2>
      <form>
        <label htmlFor="quote">Frase</label>
        <input
          onChange={handleNewQuote}
          value={newQuote.quote}
          type="text"
          name="quote"
          id="quote"
        />
        <label htmlFor="character">Personaje</label>
        <input
          onChange={handleNewQuote}
          value={newQuote.character}
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
