# Fork of n8n for USGS Astro
**Dependencies:**
- [NodeJS](https://nodejs.org) >= 14
- [Docker](https://docs.docker.com/engine/install)
- [docker-compose](https://docs.docker.com/compose/install)

For windows, node-gyp requires [additional setup](https://meet.google.com/linkredirect?authuser=2&dest=https%3A%2F%2Fgithub.com%2Fnodejs%2Fnode-gyp%23on-windows)

Setup:
```console
$ npm i
$ npm run bootstrap
```

Build:
```
$ npm run build
```

Set the URL for the backend:
```
$ export OSIRIS_API=http://127.0.0.1:8080
```

Start:
```
$ npm run start
```
