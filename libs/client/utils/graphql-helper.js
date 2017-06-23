// TODO: This should be provided by the user somehow
let accessToken = '2b655a06ee84a9938e96b9c79136f0a98c677937';

export function makeRequest(query, variables) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/graphql?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => {
      response.json().then(resolve);
    });
  });
}