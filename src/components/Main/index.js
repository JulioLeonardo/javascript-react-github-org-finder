import { useState } from "react";

import api from "../../services/api";
import Organization from "../Organization";
import "./styles.css";
import octocat from "../../assets/img/octocat.png";

export default function SearchOrganization() {
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

      const orgInfo = await api.get(organization);

      setOrganizationData(orgInfo.data);

      setTimeout(() => {
        setLoading(false);
        setFetched(true);
      }, 800);
      clearTimeout();
    } catch (e) {
      setLoading(false);
      setError(true);
      console.log(e);
    }
  };

  return (
    <>
      {!fetched && !error && !loading && (
        <div className="search-organization">
          <div className="main-header-search-block-wrapper">
            <div className="main-header">
              <p className="logo">{"<Github Orgs/>"}</p>
              <p className="app-description">
                Encontre os perfis das organizações que usam o github e liste
                seus repositórios
              </p>
            </div>
            <div className="search-block">
              <label htmlFor="org-search">
                <p>Pesquise a</p> <p>organização</p>{" "}
                <p className="last-line">
                  aqui <span id="cursor"></span>
                </p>
              </label>
              <div className="input-block">
                <input
                  type="text"
                  name="org-search"
                  id="org-search"
                  onChange={handleInputChange}
                />
                <button type="submit" onClick={searchOrg}>
                  <svg
                    id="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="octocat">
            <img id="octocat" src={octocat} alt="octocat" />
          </div>
        </div>
      )}

      {loading && (
        <div className="loader-div">
          <div class="loader"></div>
        </div>
      )}

      {fetched && (
        <Organization
          organizationData={organizationData}
          setFetched={setFetched}
          setOrganization={setOrganization}
        />
      )}

      {error && (
        <div className="not-found">
          <div className="go-back" onClick={() => setError(false)}>
            {"< Voltar"}
          </div>
          <h3>404</h3>
          <p>Oops! Organização não encontrada...</p>
          <p>Verifique o nome da organização, talvez ela não use o Github...</p>
        </div>
      )}
    </>
  );
}
