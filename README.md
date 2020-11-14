# Fork of n8n for USGS Astro
**Dependencies:**
- [NodeJS](https://nodejs.org)
- [Docker](https://docs.docker.com/engine/install)
- [docker-compose](https://docs.docker.com/compose/install)

Setup:
```console
$ npm i
$ npm run bootstrap
```

Build:
```
$ npm run build
```

Start:
```
$ npm run start
```

Start in docker with minio S3:
```
$ docker-compose up -d --build
```

Start minio s3 only:
```
$ docker-compose up -d minio
```
