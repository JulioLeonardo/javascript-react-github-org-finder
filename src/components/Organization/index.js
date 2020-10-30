export default function Organization({ organizationData, pages, setFetched }) {
  //   avatar_url: "https://avatars1.githubusercontent.com/u/1342004?v=4"
  // blog: "https://opensource.google/"
  // company: null
  // created_at: "2012-01-18T01:30:18Z"
  // description: "Google ❤️ Open Source"
  // email: "opensource@google.com"
  // events_url: "https://api.github.com/orgs/google/events"
  // followers: 0
  // following: 0
  // has_organization_projects: true
  // has_repository_projects: true
  // hooks_url: "https://api.github.com/orgs/google/hooks"
  // html_url: "https://github.com/google"
  // id: 1342004
  // is_verified: true
  // issues_url: "https://api.github.com/orgs/google/issues"
  // location: null
  // login: "google"
  // members_url: "https://api.github.com/orgs/google/members{/member}"
  // name: "Google"
  // node_id: "MDEyOk9yZ2FuaXphdGlvbjEzNDIwMDQ="
  // public_gists: 0
  // public_members_url: "https://api.github.com/orgs/google/public_members{/member}"
  // public_repos: 1881
  // repos_url: "https://api.github.com/orgs/google/repos"
  // twitter_username: "GoogleOSS"
  // type: "Organization"
  // updated_at: "2020-06-23T17:20:00Z"
  // url: "https://api.github.com/orgs/google"

  const title =
    organizationData.login.charAt(0).toUpperCase() +
    organizationData.login.slice(1);
  const avatar = organizationData.avatar_url;
  const description = organizationData.description;
  const location = organizationData.location;
  const blog = organizationData.blog;
  const twitter = organizationData.twitter_username;
  const email = organizationData.email;
  const verified = organizationData.is_verified;

  console.log(avatar);

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
          <p>{organizationData.login}</p>
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
    </div>
  );
}
