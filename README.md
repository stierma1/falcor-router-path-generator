# falcor-router-path-generator
Code generator, given a json object will attempt to build out some basic paths associated with it

## Usage

```
npm install -g falcor-router-path-generator
falcor-router-path-generator --prefix tasks --input the/path/to/myObj.json --output the/path/to/myRoutes.js

```

## Example

```
//My Object
{
  "id": "123",
  "firstName": "John",
  "lastName": "Doe",
  "address": {
    "streetLines": [
      "123 Fake Str.",
      "Appartment 4"
    ],
    "city": "Springfield",
    "state": "IL",
    "zipcode": 53500
  },
  "siblings": [
    "124",
    "125"
  ]
}

falcor-router-path-generator --prefix users[{integers:id}] --input the/path/to/myObj.json

// Output
[
  {
    "route": "users[{integers:id}].id"
  },
  {
    "route": "users[{integers:id}].firstName"
  },
  {
    "route": "users[{integers:id}].lastName"
  },
  {
    "route": "users[{integers:id}].address.streetLines[{integers:idx2}]"
  },
  {
    "route": "users[{integers:id}].address.city"
  },
  {
    "route": "users[{integers:id}].address.state"
  },
  {
    "route": "users[{integers:id}].address.zipcode"
  },
  {
    "route": "users[{integers:id}].siblings[{integers:idx1}]"
  }
]

``
