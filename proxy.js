const http = require('http');
const fetch = require('node-fetch');

const server = http.createServer((req, res) => {
  const comicNumber = req.url.slice(1);

  if (comicNumber !== '' && isNaN(comicNumber)) {
    res.statusCode = 406;
    res.end();
    return;
  }

  const comicQuery = comicNumber ? `${comicNumber}/` : '';

  fetch(`http://xkcd.com/${comicQuery}info.0.json`)
    .then(response => {
      if (response.status !== 200) {
        res.statusCode = response.status;
        res.setHeader('Content-type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.write({ message: res.statusText });
        res.end();

        return null;
      }

      return response.json();
    })
    .then(data => {
      if (!data) {
        return
      }

      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.write(JSON.stringify(data));
      res.end();
    }).catch(error => {
      console.error(error);
      res.statusCode = 500;
      res.setHeader('Content-type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.write({ message: error.message || 'Unindentified error' });
      res.end();
    });
});

server.listen(80, () => {
  console.log('Server running!');
});