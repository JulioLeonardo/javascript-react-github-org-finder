import { useState } from "react";

import api from "../../services/api";
import Organization from "../Organization";

function SearchOrganization() {
  const [organization, setOrganization] = useState("");
  const [organizationData, setOrganizationData] = useState([]);
  const [organizationRepos, setOrganizationRepos] = useState([]);
  const [pages, setPages] = useState();
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

      const orgInfo = await api.get(organization);

      setOrganizationData(orgInfo.data);

      const repoPages = Math.ceil(orgInfo.data.public_repos / 30);
      setPages(repoPages);

      const orgRepos = await api.get(organization + "/repos");

      setOrganizationRepos(orgRepos);

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

      {fetched && (
        <Organization
          organizationData={organizationData}
          organizationRepos={organizationRepos}
          pages={pages}
          setFetched={setFetched}
        />
      )}

      {error && <p>Organização não encontrada</p>}
    </>
  );
}

export default SearchOrganization;
