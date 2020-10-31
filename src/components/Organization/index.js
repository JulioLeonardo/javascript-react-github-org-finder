import OrgRepos from "../OrgRepos";

export default function Organization({ organizationData, setFetched }) {
  const login = organizationData.login;
  const title = login.charAt(0).toUpperCase() + login.slice(1);
  const avatar = organizationData.avatar_url;
  const description = organizationData.description;
  const location = organizationData.location;
  const blog = organizationData.blog;
  const twitter = organizationData.twitter_username;
  const email = organizationData.email;
  const verified = organizationData.is_verified;
  const totalRepos = organizationData.public_repos;
  console.log(totalRepos);

  return (
    <div className="organization">
      <div className="header">
        <div
          className="back"
          onClick={() => {
            setFetched(false);
          }}
        >
          {"<"}
        </div>
        <div className="organization-header-title">
          <p>{login}</p>
        </div>
        <div className="notifications">
          <p>Notificações</p>
        </div>
      </div>
      <div className="avatar-div">
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
      <div className="info-div">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
        {location && <p className="info">{location}</p>}
        {blog && <p className="info">{blog}</p>}
        {twitter && <p className="info">{twitter}</p>}
        {email && <p className="info">{email}</p>}
        {verified && <p className="verified">Verified</p>}
      </div>
      <OrgRepos login={login} totalRepos={totalRepos} />
    </div>
  );
}
