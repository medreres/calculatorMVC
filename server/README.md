# Description:

REST API for calculating math expression. Support two ways of evaluating expressions.

# Endpoints

## GET operations

`GET /operations` - returns a list of available operations

Response object:

```ts
{
  data: ["+", "-"];
}
```

## POST evaluate

`POST /expression` - evaluates math expression given via expression param

```ts
body: {
    expression=<string>
}
```

Response object:

```ts
{
    data: <number>
}
```

## GET constants

`GET /constants` - returns a list of available constants

Response object:

```ts
{
  data: [
    {
      key: "PI",
      value: 3.141592653589793,
    },
  ];
}
```

## GET expressions

`GET /expressions`  - Returns expressions saved in db.
Params:
`limit=<number>` - max number of documents to be returned
`sort=<key:value>` - sorts documents by key, value could either 'asc' or 'desc'
`skip=<number>` - skips n number of document



Response object:

```ts
{
  data: [
    {
      id: "6433c20a9db5dd90e7a95bad",
      createdAt: "2023-04-10T08:00:10.242Z",
      updatedAt: "2023-04-10T08:00:10.242Z",
      expression: "1262-123",
      result: "1139",
    },
  ];
}
```

# Config

You may want to change algorithm used for evaluating, to do so go to `./src/libs/Calculator/config/algorithm.ts` and chose one of available algorithms in `CalculatingAlgorithms` object.
