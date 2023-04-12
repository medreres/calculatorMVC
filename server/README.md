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

`POST /evaluate` - evaluates math expression given via expression param

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

// TODO doc
## GET expressions

`GET /expressions?limit=<number>&sort=<key:value>&skip=<number>` - returns a list of available operations with optional limit,
that specifies max number of expressions to be returned

Response object:

```ts
{
  data: [
    {
      _id: "6433c20a9db5dd90e7a95bad",
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
