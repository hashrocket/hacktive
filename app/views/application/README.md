# [Hacktive](https://hashrocket.com)

> A social list of Github activity

Keep track of your developer friends as they commit to, pull from, and otherwise advance various projects.

## Dependencies
To minimize startup issues, install the following dependencies before attempting to install Hacktive:

* **Ruby 2.3**+ ([RVM recommended](https://rvm.io/))
* **[PostgreSQL 9.4+](http://www.postgresql.org/)**
	* Hacktive relies on the way ActiveRecord reads JSON from the database.
	Using PostgreSQL <9.4 will result in errors.

## Installation
Follow these instructions to get the app running on your local environment

```sh
$ git clone https://github.com/hashrocket/hacktive.git
$ cd hacktive
$ bundle install
$ rake db:setup
$ rake db:seed
$ rails s
```

## Hosting
Hacktive can be found publicly at the following locations:

* [Staging](http://hashrocket-hacktive-staging.herokuapp.com/)

## License
Hacktive is released under the [MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2016 Hashrocket
