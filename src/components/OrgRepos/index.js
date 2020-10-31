import { useEffect, useState } from "react";

import Pagination from "rc-pagination";

import api from "../../services/api";
import Repo from "../Repo";
import githubColors from "../../services/githubColors";
import "./styles.css";

export default function OrgRepos({ login, totalRepos }) {
  const [organizationRepos, setOrganizationRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [colors, setColors] = useState([]);

  async function getRepos() {
    const fetchRepos = await api.get(login + "/repos?page=" + currentPage);
    setOrganizationRepos(fetchRepos.data);
  }

  useEffect(() => getRepos(), [currentPage]);

  async function getGithubColors() {
    const colors = await githubColors.get();
    setColors(colors);
  }

  useEffect(() => {
    getGithubColors();
  }, []);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className="organization-repos">
      {organizationRepos.map((repo, i) => (
        <Repo key={i} repo={repo} colors={colors} />
      ))}
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        pageSize={30}
        total={totalRepos}
      />
    </div>
  );
}
