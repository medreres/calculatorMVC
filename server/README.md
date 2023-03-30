# Description:

REST API for calculating math expression. Support two ways of evaluating expressions

# Endpoints

## GET getOperations

`GET /getOperations` - returns a list of available operations

Response object:

```ts
{
  operations: ["+", "-"];
}
```

## GET evaluate

`GET /evaluate?expression=<string>` - evaluates math expression given via expression param

Response object:

```ts
{
    result: <number>
}
```

## GET constants

`GET /constants` - evaluates math expression given via expression param

Response object:

```ts
{
    "constants": [
        {
            "key": "PI",
            "value": 3.141592653589793
        }
    ]
}
```
