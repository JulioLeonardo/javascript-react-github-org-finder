import { useState } from "react";

import api from "../../services/api";
import Organization from "../Organization";

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
          setFetched={setFetched}
        />
      )}

      {error && <p>Organização não encontrada</p>}
    </>
  );
}
