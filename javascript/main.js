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
    repositories(first: 20, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
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

const handleData = (data) => {
  const avatar = document.querySelectorAll("img");
  avatar.forEach((img) => {
    img.src = data.avatarUrl;
  });
  const name = document.querySelector(".name")
  name.innerHTML = data.name
  const login = document.querySelector(".login")
  login.innerHTML = data.login
  const bio = document.querySelector(".bio")
  bio.innerHTML = data.bio
  const followers = document.querySelector(".followers")
  followers.innerHTML = `${data.followers.totalCount} followers`
  const following = document.querySelector(".following")
  following.innerHTML = `${data.following.totalCount} following`
  const starred = document.querySelector(".starred")
  starred.innerHTML = data.starredRepositories.totalCount
  const company = document.querySelector(".company")
  company.innerHTML = data.company
  const location = document.querySelector(".location")
  location.innerHTML = data.location
  const websiteUrl = document.querySelector(".website-url")
  websiteUrl.innerHTML = data.websiteUrl
  const repoList = document.querySelector(".repo-list")
  data.repositories.nodes.forEach((repository) => {
    console.log(repository)
    const repoNameLink = document.createElement('a');
    repoNameLink.className = "repo-name-link"
    repoNameLink.innerHTML = repository.name
    const repoName = document.createElement('h3');
    repoName.className = "repo-name"
    repoName.appendChild(repoNameLink)
    const repoDescription = document.createElement('p');
    repoDescription.className = "repo-description"
    repoDescription.innerHTML = repository.description
    const repoLangLicenceTime = document.createElement('div');
    repoLangLicenceTime.className = "repo-lang-licence-time"
    repoDetailsLeft = document.createElement('div')
    repoDetailsLeft.className = "repo-details-left"
    repoDetailsLeft.appendChild(repoName)
    repoDetailsLeft.appendChild(repoDescription)
    repoStarButton = document.createElement('button')
    repoStarButton.className = "repo-star-button"
    repoStarButton.innerHTML = 'Star'
    repoDetailsRight = document.createElement('div')
    repoDetailsRight.className = "repo-details-right"
    repoDetailsRight.appendChild(repoStarButton)
    repoDetails = document.createElement('div')
    repoDetails.className = "repo-details"
    repoDetails.appendChild(repoDetailsLeft)
    repoDetails.appendChild(repoDetailsRight)
    repoList.appendChild(repoDetails)
  })
};

const GETData = () => {
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer 374708be08e1d0d36b4b16b345735ec9593b9861`,
    },
    body: JSON.stringify({ query: queryParameters })
  })
    .then(res => res.json())
    .then(res => {
      handleData(res.data.user)
      console.log(res.data.user)
    })
    .catch(err => console.log(err))
}

GETData()