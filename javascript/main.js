const queryParameters = `{
  user(login: "durotolu") {
    avatarUrl
    name
    login
    bio
    followers {
      totalCount
    }
    following {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    company
    location
    websiteUrl
    repositories(first: 2, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        id
        languages (first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
            color
          }
        }
        description
        homepageUrl
        name
        updatedAt
        url
        stargazers {
          totalCount
        }
        licenseInfo {
          name
        }
      }
    }
  }
}`

const GETData = () => {
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer 374708be08e1d0d36b4b16b345735ec9593b9861`,
    },
    body: JSON.stringify({ query: queryParameters})
  })
  .then(res => console.log(res.json()))
  .catch(err => console.log(err))
}

// GETData()