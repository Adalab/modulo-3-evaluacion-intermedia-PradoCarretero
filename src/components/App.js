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
  const [errorMessage, setErrorMessage] = useState("");

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
      <li key={index} className="form__phrase">
        <p className="form__quote">{any.quote}</p>
        <p className="form__character">{any.character}</p>
      </li>
    ));

  const handleNewQuote = (ev) => {
    setNewQuote({ ...newQuote, [ev.target.id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    if (newQuote.quote !== "" && newQuote.character !== "") {
      setQuoteData([...quoteData, newQuote]);
      setErrorMessage("");
      setNewQuote({
        quote: "",
        character: "",
      });
    } else {
      setErrorMessage("Rellene los campos de texto");
    }
  };

  const handleSearchCharacter = (ev) => {
    setSearchCharacter(ev.target.value);
  };

  const handleSearchQuote = (ev) => {
    setSearchQuote(ev.target.value);
  };

  const message = () => {
    const length = htmlData.length;
    if (length > 1) {
      return "Resultados de su búsqueda:" + length;
    } else {
      return "Lo sentimos, no hay resultados para su búsqueda";
    }
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
            value={searchCharacter}
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
        <p className="form__number">{message}</p>
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
        <p>{errorMessage}</p>
      </footer>
    </>
  );
}

export default App;
