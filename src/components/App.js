import "../styles/App.scss";
import callToApi from "../services/api";
import { useEffect, useState } from "react";
import image from "../images/image.png";

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
      <li key={index} className="header__form--phrase">
        <p className="header__form--quote">{any.quote}</p>
        <p className="header__form--character">{any.character}</p>
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
      <header className="header">
        <h1 className="header__title">Frases de friends</h1>
        <img src={image} className="header__img" alt="image friends serie" />
        <form className="header__form">
          <label htmlFor="searchQuote">Filtrar por frase</label>
          <input
            onChange={handleSearchQuote}
            value={searchQuote}
            type="text"
            name="searchQuote"
            id="searchQuote"
          />
          <label htmlFor="searchCharacter">Filtrar por personaje</label>
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
      </header>

      <main>
        <ul>{htmlData}</ul>
      </main>
      <footer className="footer">
        <h2 className="footer__title">Añadir una nueva frase</h2>
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
      </footer>
    </>
  );
}

export default App;
