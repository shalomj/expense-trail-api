# Expense Trail API

REST API for Expense Trail app made with NodeJS, Express, MongoDB, and TypeScript

## Setup

### Install dependencies

```sh
npm install
```

### Configuration

Create `.env` file and setup environment-specific variables.

```dosini
NODE_ENV=local
PORT=5000
DB_CONNECTION=mongodb://localhost/expensetrail
MIGRATE_dbConnectionUri=mongodb://localhost/expensetrail
JWT_ACCESS_TOKEN_SECRET=secret
```

### JWT secret key

You can generate secret key for JWT using NodeJS Crypto module

```dosini
$ node
> require('crypto').randomBytes(64).toString('hex');
'5e76c258d276f6965abe0e418d829aeb339d6d8182dec5a8729558c8e8811780e18caa8910fc71d7a00ac1375f348041d45c34c163a2f41640b0036b938ea8f9'
```

### Run TypeScript build

```dosini
tsc
```

## Usage

```sh
$ npm start or npm run dev
Connecting to database...
Server running on port 5000
Database connected: localhost
```
