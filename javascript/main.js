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
  const avatar = document.querySelectorAll(".img-icon");
  console.log(avatar)
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
  followers.innerHTML = data.followers.totalCount
  const following = document.querySelector(".following")
  following.innerHTML = data.following.totalCount
  const starred = document.querySelector(".starred")
  starred.innerHTML = data.starredRepositories.totalCount
  const company = document.querySelector(".company")
  company.innerHTML = data.company
  const location = document.querySelector(".location")
  location.innerHTML = data.location
  const websiteUrl = document.querySelector(".website-url")
  websiteUrl.innerHTML = data.websiteUrl
  const repoHeading = document.querySelector("#selected")
  const repoTotal = document.createElement('span');
  repoTotal.className = "repo-total"
  repoTotal.innerHTML = data.repositories.totalCount
  repoHeading.appendChild(repoTotal)
  const repoList = document.querySelector(".repo-list")
  data.repositories.nodes.forEach((repository) => {
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

    const repoColor = document.createElement('span');
    repoColor.className = "repo-color";
    repoColor.style.backgroundColor = repository.languages.nodes[0] ? repository.languages.nodes[0].color : null
    const repoLang = document.createElement('span');
    repoLang.innerHTML = repository.languages.nodes[0] ? repository.languages.nodes[0].name : null

    const repoLicence = document.createElement('span')
    repoLicence.className = "repo-licence"
    repoLicence.innerHTML = repository.licenseInfo.name

    const repoTime = document.createElement('span')
    repoTime.className = "repo-time"
    repoTime.innerHTML = repository.updatedAt

    repoLangLicenceTime.appendChild(repoColor)
    repoLangLicenceTime.appendChild(repoLang)
    repoLangLicenceTime.appendChild(repoLicence)
    repoLangLicenceTime.appendChild(repoTime)

    repoDetailsLeft = document.createElement('div')
    repoDetailsLeft.className = "repo-details-left"
    repoDetailsLeft.appendChild(repoName)
    repoDetailsLeft.appendChild(repoDescription)
    repoDetailsLeft.appendChild(repoLangLicenceTime)
    repoStarButton = document.createElement('button')
    repoStarButton.className = "repo-star-button select-color"
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
      Authorization: `bearer `,
    },
    body: JSON.stringify({ query: queryParameters })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res.data.user)
      // console.log(res.data.user.repositories.nodes[3].languages.nodes[0].name)
      handleData(res.data.user)
    })
    .catch(err => console.log(err.json()))
}

GETData()