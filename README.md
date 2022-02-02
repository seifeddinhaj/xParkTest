# Xpark Test


This project is composed from tow seperated apps one for the Server API REST (Ruby on Rails) and the client app (ReactJs)
For the server side i used RoR to built the api that the client app will consume it:
 - I used `devise_token_auth` gem for the authentication and handle the authorizations for  certain routes
 - I used gem `acts_as_list` to ensure the sequency of the states
 - I used `rspec` to test the diffrent controllers
For the client app :
 - I used ReactJs to built a small dashboard with login page
 - I used Redux to manage the state of the app


## Built With

```
- Ruby On Rails
- ReactJs
```

## Preparation

### Basic packages

```
$ sudo apt-get install vim git wget gcc mutt libssl-dev curl bundler
```

### Bundler

> We ask Rubygems not to install the documentation for each gem locally and then install Bundler

```

> $ echo "gem: --no-ri --no-rdoc" > ~/.gemrc
> $ gem install bundler
```

### Ruby / Rails

```
$ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

$ \curl -sSL https://get.rvm.io | bash

$ rvm install ruby-2.7.2
$ rvm use 2.7.2
$ gem install rails -v 6.0.4
```

> Check Gemfile for Rails Version

### Postresql

```
$ sudo apt-get install postgresql postgresql-contrib
```

> Allow logins with password

```
$ vim /etc/postgresql/12/main/pg_hba.conf
local   all             postgres          md5
```

> Restart the service for the changes to take effect

```
$ sudo /etc/init.d/postgresql restart
```

### Node / npm / yarn

```
$ sudo apt-get remove nodejs npm --purge
$ sudo apt-get install nodejs
$ npm install --global yarn
```

## Setup

> Follow these steps to install this app locally

### Install Gems

> Ensure all dependencies in the Gemfile/Package.json are available to the application.

```
$ bundle install
$ yarn install (for the front end app)
```

### Configure database

> The config/database.yml file
// Edit username and password with your Postgres username and password


### Creation, migration and population of the database

```
$ rails db:create db:migrate db:seed
```


### Launch the backend application

```
rails s
```
### Launch the frontend application

```
yarn start
```

> Use these details to login as admin:

```
Email = "admin_1@gmail.com"
Password = "password"
```
> Use these details to login as regular user:

```
Email = "regular_1@gmail.com"
Password = "password"
```
## Testing

> Follow these steps to run ruby ​​tests locally

- Open terminal from project folder
- Run `bundle exec rails db:create db:migrate RAILS_ENV=test` to create and migrate the test database
- Run `bundle exec rspec` to run the tests

> To view test coverage for the project

- Run `TEST_COVERAGE=true bundle exec rspec`
- A folder will be generated in `/coverage/rspec`
- Open `coverage/rspec/index.html` file from browser



### Docker


Dependencies:
This is a deployment using Docker & Docker-compose. So you should have:
```
docker
docker-compose
```
installed in your server.
## What you should know about docker-compose.yml

### Services

We have 3 services in this project:
  - **`web` service**:
    This service is our RoR web service application
  - **`database` service**
  - **`redis` service**

### Volumes

To preserve our data we use volume for:

  - storing our database data: volume name => `postgresdb`

## Usage

To deploy this project on your local machine in development mode:

  - 1.You have to go in the branche `docker` `git checkout docker`
  - 2.Start all services with `docker-compose up --build`
  - 3.Connect into container web with `docker exec -it xpark_web_1 bash`
  - 4.set up the database with `rails db:setup`
  - 5.go back to the log of the docker-compose build command to see the address
    in wich the front app is running it's like this one `On Your Network:  http://192.168.48.4:3000`

![alt text](https://github.com/seifeddinhaj/xParkTest/blob/master/log.png)

Shutdown all services
```
docker-compose down
```

Connect into container service
```
docker-compose run $SERVICE_NAME bash
```

Or
```
docker exec -it $CONTAINTER_NAME bash
```

List all starting container
```
docker ps
