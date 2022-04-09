# Initialize postgres

- brew install postgresql
- postgres --version
- sudo mkdir /usr/local/var
- sudo mkdir /usr/local/var/postgres
- sudo chmod 775 /usr/local/var/postgres
- sudo chown construct /usr/local/var/postgres
- initdb /usr/local/var/postgres
- createdb tinea_api

# Setup

- install yarn dependencies with `yarn`
- start the api with `yarn start`
- see the terminal and check if all necessary consts are set
