# fullstack-template

## Docker Variant

What you will need:
* Docker 

Tested on: 
* Docker Engine v20.10.17
* Docker Desktop v4.10.1.

### Useful commands
Inside *`integration`* folder you can use the following commands:

> Run application (and build):
```sh
docker-compose up --build
```

> Run application (with full logging available):
```sh
docker-compose up
```

> Run application (detached mode/with no logging available):
```sh
docker-compose up -d
```

> Stop application:
```sh
docker-compose down
```

> View logs for specific project/container of the application (e.g., backend):
```sh
docker-compose logs -f backend
```

## Verbose Variant

What you will need:
* NodeJS
* Angular
* MongoDB

Tested on: 
* NodeJS v18.12.1
* Angular v14.2.8
* MongoDB v4.4

### Useful commands
Before running the application and after every new node_module is installed using `npm install @package-name`, all project members must execute in both *`backend`* and *`frontend`*:
```sh
npm install
``` 

For frontend, inside *`frontend`* folder:

> Run frontend:
```sh
ng serve
```

> Run frontend (open access from other devices using server's IP):
```sh
ng serve --host 0.0.0.0
```

For backend, inside *`backend`* folder:
> Run backend:
```sh
npm run dev
```

**Do not forget**: mongod.exe (if on Windows) must be running for the Database to be used. 
