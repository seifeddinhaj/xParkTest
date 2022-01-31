# Xpark Test

<!-- ## Description

Wide collecte et diffuse l’offre aux intermédiaires pour lui assurer une visibilité totale sur le marché. -->


<!-- ## Live links

[Production](https://wide-immo.com/)

[Staging](https://staging.wide-immo.com/) -->

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

### Installer les gems

> Ensure all dependencies in the Gemfile/Package.json are available to the application.

```
$ bundle install
$ yarn install (for the front end app)
```

### Configure database

> Le fichier config/database.yml
// Editer username et password avec votre username et password Postgres
```

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

## Testing

> Follow these steps to run ruby ​​tests locally

- Open terminal from project folder
- Run `bundle exec rails db:create db:migrate RAILS_ENV=test` to create and migrate the test database
- Run `bundle exec rspec` to run the tests

> To view test coverage for the project

- Run `TEST_COVERAGE=true bundle exec rspec`
- A folder will be generated in `/coverage/rspec`
- Open `coverage/rspec/index.html` file from browser
