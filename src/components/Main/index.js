import { useState } from "react";

import api from "../../services/api";
import Organization from "../Organization";

function SearchOrganization() {
  const [organization, setOrganization] = useState("");
  const [organizationData, setOrganizationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setOrganization(e.target.value);
  };

  const searchOrg = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const result = await api.get(organization);

      console.log(result.data);

      setOrganizationData(result.data);

      // const response = await api.get(`/repos/${newRepo}`);

      // if (repositories) {
      //   repositories.map((repo) => {
      //     if (repo.name === response.data.full_name) {
      //       throw new Error("Repositório Duplicado");
      //     }
      //   });
      // }

      // const data = {
      //   name: response.data.full_name,
      // };

      // this.setState({
      //   repositories: [...repositories, data],
      //   newRepo: "",
      //   loading: false,
      // });
      setLoading(false);
      setFetched(true);
    } catch (e) {
      setLoading(false);
      setError(true);
      console.log(e);
    }
  };

  return (
    <>
      {!fetched && !error && (
        <div className="search-organization">
          <label htmlFor="org-serach">Pesquise aqui a organização</label>
          <input
            type="text"
            name="org-search"
            id="org-search"
            onChange={handleInputChange}
          />
          <button type="submit" onClick={searchOrg}>
            Buscar
          </button>
        </div>
      )}

      {loading && <p>carregando...</p>}

      {fetched && <Organization organizationData={organizationData} />}

      {error && <p>Organização não encontrada</p>}
    </>
  );
}

export default SearchOrganization;
