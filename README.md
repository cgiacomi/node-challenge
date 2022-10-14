# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc.

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |

Happy hacking 😁!

## What Have I done?

### Typescript types

The codebase has been enriched to support more explicit types both in the User domain and Expense domain.

### Basic Expense route

The API supports a basic route for Expenses by userId following the same paradigm as the User domain.

### Filtering out unwanted properties

The codebase does not use JSON.stringify() any longer as this was returning a string representation of the JSON response and not an actual JSON object.

Trimming of fields is now performed using Destructuring assignment. This creates a copy of the original object without the unwanted fields. The syntax might look a bit strange but it allows the developer to continue working with actual objects and not strings. Returning strings to the client breaks the specified `Content-Type` header, while the new way does not.

### Paging

The API support paging for the Expense domain, using the following query parameters `limit` and `page`. Limit controls the number of records returned per request, while page controls the current offset. Ideally a client that wants to see all the records would increase the count of `page` and maintain the same value for `limit`.

The paging caters for erroneous values, including negative numbers.

```bash
    <BASE URI>/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&page=1&limit=1
```

The paging currently supports some simple defaults, and the query parameters are optional.

### Filtering

Filtering the results can be achieved using simple query syntax based on the JSON API specification as can be seen [here](https://jsonapi.org/recommendations/#filtering).

Here is an example.

```bash
    <BASE URI>/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&filter[merchantName]=Sliders
```

This allows multiple filters to be applied at the same time, like so.

```bash
    <BASE URI>/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&filter[merchantName]=Sliders&filter[currency]=dkk
```

Currently it is possible to only filter on the same property once, future versions could support more complex filtering rules and patterns.

Current supported filters include `merchantName`, `currency` and `status`.

### Sorting

Sorting is supported using simple query syntax based on the JSON API specification as can be seen [here](https://jsonapi.org/format/#fetching-sorting).

It is possible to sort on multiple parameters using comma separated values like so.

```bash
    <BASE URI>/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=merchant_name,currency
```

The following query will sort the results by merchant name and currency in an ascending fashion. To sort in a descending manner simply prefix the field name with a dash `-` like below. This will sort the results by merchant name `descending` and currency `ascending`.

```bash
    <BASE URI>/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=-merchant_name,currency
```

It is also possible to apply the descending option to multiple parameters, like so.

```bash
    <BASE URI>/expense/v1/expenses-for-user?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sort=-merchant_name,-currency
```

### Unit tests

A few more unit tests have been added to cater for the changes in the formatter, both for the User and Expense domain.

### Acceptance tests

More acceptance tests have been added to verify that the changes to the code do not break any existing code (regression testing), as well as all the new features are covered by simple functional tests.
