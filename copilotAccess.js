const axios = require('axios');

const githubToken = 'your_token_here';

axios({
  method: 'get',
  url: 'https://api.github.com/repos/{your_username}/jkl-weekend-server-calculator',
  headers: {
    Authorization: `token ${
        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}`
  }
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  console.error(error);
});

