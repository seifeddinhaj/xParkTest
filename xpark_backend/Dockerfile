FROM ruby:2.7.2

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

RUN mkdir /xpark_backend

WORKDIR /xpark_backend

COPY Gemfile /xpark_backend/Gemfile

COPY Gemfile.lock /xpark_backend/Gemfile.lock

RUN bundle install

COPY . /xpark_backend

EXPOSE 3000