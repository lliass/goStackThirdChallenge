import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  function ramdomIndex(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  async function handleAddRepository() {
    // TODO

    const repositorieTitle = [
      "Facebook",
      "Instagram",
      "Google",
      "Gmail",
      "Online Data Cloud",
      "Impacta",
      "IBM",
      "JBL",
    ];

    const repositorieLing = [
      "Python",
      "JavaScript",
      "GO",
      "Ruby",
      "Java",
      "Kotlin",
      "Fluter",
      "C",
      "C++",
      "C#",
    ];

    const repositorieURL = [
      "https://github.com/ElijahLopp",
      "https://github.com/ghards",
      "https://github.com/Guilherme-A-Santos",
      "https://github.com/DartagnanJunior",
    ];

    const response = await api.post("repositories", {
      title: ramdomIndex(repositorieTitle),
      url: ramdomIndex(repositorieLing),
      techs: [
        ramdomIndex(repositorieURL),
        ramdomIndex(repositorieURL),
        ramdomIndex(repositorieURL),
      ],
    });

    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    const repositoriesIndex = repositories.filter((repo) => repo.id !== id);
    setRepositories(repositoriesIndex);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
