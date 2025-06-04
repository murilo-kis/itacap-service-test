[Industrial Training and Assessment Centers](https://itac.university/)

# Local Development

## Pre-requisites

- Docker Desktop (for local development)
- Node.js >= 24 (use `n` or `nvm` to manage versions)

Start the Database via Docker:

```bash
docker run --name itac-mysql -p 3333:3306 -v /tmp/itac/mysql/datadir:/var/lib/mysql -v ./db/sql:/docker-entrypoint-initdb.d -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d mysql:8.0
```

Install dependencies with `npm i`

Run the app with `npm start`

## Entry Points

- [Swagger](http://localhost:3030/api-docs/)
- [Example Operation](http://localhost:3030/api/example/)

# Remote Development

TODO: Dockerize

`npm run server`

# Development Guide

## Database

Locally we are using MySQL 8.0. The database is initialized with the SQL files in the `db/sql` directory. You can
reset everything by stopping and removing the container and also removing the data directory:

```bash
# stop and remove the container
docker stop itac-mysql
docker rm itac-mysql
# remove the datadir
rm -rf /tmp/itac/mysql/datadir
```

## 📂 Branch Structure

- **Main Branches:**

  - `main`: Production-ready code.
  - `qa`: Staging branch where features are integrated before being released. Used for Testing.
  - `dev`: Used for development.

- **Supporting Branches:**
  - ✨ `feature/*`: Branches for developing new features.
  - 🐛 `bugfix/*`: Branches for fixing bugs on the `qa` branch.
  - 🚑 `hotfix/*`: Branches for fixing critical bugs on the `main` branch.
  - 🔧 `chore/*`: Branches for routine tasks and maintenance.
  - 🧪 `experimental/*`: Branches for testing out new ideas or experimental features.
  - 📝 `docs/*`: Branches for documentation updates and changes.
  - ♻️ `refactor/*`: Branches for refactoring code without changing its functionality.

## 🔄 GitFlow Workflow

1. **General Development (Feature, Bugfix, Chore, Docs, Refactor and Experimental:**

  - Create a feature branch from `qa`: `<prefix>/your-feature`. Use the GIRA ticket for the name.
  - Make the changes and test locally it if applicable.
  - Merge the branch into `dev` for further testing.

2. **QA Merge:**

  - Perform final testing and bug fixes on `dev`. Make sure code is ready and stable.
  - Merge the original branch `<prefix>/your-feature` into `qa` using a PR.
  - Delete the source branch after merging.

3. **Release Preparation:**

  - After changes are aproved on QA.
  - Merge the branch `qa` into `main` using a PR.
  - Tag the release on the `main` branch.

4. **Hotfixes:**
  - Create a hotfix branch from `main`: `hotfix/x.y.z`.
  - Fix the critical issue and test it.
  - Merge the hotfix branch into `main` and `qa` using a PR.
  - Tag the hotfix on the `main` branch.
  - Delete the hotfix branch after merging.

## Testing and Code Coverage

Run tests with `npm test` and generate code coverage with `npm run coverage`. The code coverage report will be
available at `coverage/lcov-report/index.html`

You can run a single test like login with `NOLOG=true dotenvx run -- npx jest -t 'login'`

## Authentication

The application uses JWT for authentication. The token is generated upon login and should be included in the
`Authorization` header for all subsequent requests. When using Swagger, you can obtain the JWT via the login operation
and then use the "Authorize" button to set the token for all protected requests.

## Authorization

At the time of this writing, there are no real roles or permissions in the system. When the time comes, roles can be
introduced on the JWT and mapped to permissions using Role-Based Access Control (RBAC).

# Best Practices

- Scope List
- Data Dictionary
- ERD
- Physical / Logical Data Model
- No not send the users password in clear text from the front end to the back end. In fact the system should never even
  have possession of the users password. Instead, hash the users password client side and then compare it to the users
  password hash in the database.
- Always include the standard audit fields create_user, create_dt, update_user, and update_date to all DB tables. This
  will provide visibility to whom last changed what and when.
- Do write [JSDoc](https://jsdoc.app/) and comment complex code every few lines help both yourself remember and the next
  developer understand what you were doing.
- Do provide the swagger/openai jsdoc for all endpoints.
  See [Basic Structure](https://swagger.io/docs/specification/v3_0/about/)
- Typescript is being used so use types where possible and avoid using the "any" type like the plague.
- Use `check-outdated` to check for outdated dependencies. This will help keep the code up to date and secure.

# Reference

- [Standard Industrial Classification (SIC) Code List](https://www.sec.gov/search-filings/standard-industrial-classification-sic-code-list)
- 