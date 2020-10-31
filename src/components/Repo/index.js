export default function Repo({ repo, colors }) {
  const repoLanguage = repo.language;

  const languageColor =
    colors.data[repoLanguage] && colors.data[repoLanguage].color;

  const repoLanguageColor = languageColor && {
    position: "relative",
    top: "1px",
    display: "inline-block",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: languageColor,
  };

  if (repo.license) {
    var license = repo.license.key;
    if (license === "apache-2.0") {
      license = license.charAt(0).toUpperCase() + license.slice(1);
    } else if (license === "other") {
      license = null;
    } else {
      license = license.substr(0, 3).toUpperCase() + license.slice(3);
    }
  }

  return (
    <div className="repo">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        {repo.name}
      </a>

      <p className="repo-description">{repo.description}</p>

      <div className="repo-info">
        <p className="repo-language">
          <span
            className="repo-language-color"
            style={repoLanguageColor}
          ></span>
          {repoLanguage}
        </p>
        <p className="repo-license">{license}</p>
        <p className="repo-forks">{repo.forks}</p>
        <p className="repo-stars">{repo.stargazers_count}</p>
        <p className="repo-issues">{repo.open_issues}</p>
      </div>
    </div>
  );
}
