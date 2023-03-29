# Description:

REST API for calculating math expression. Support two ways of evaluating expressions

# Endpoints

`GET /getOperations` - returns a list of available operations

Response object:
```
{
    operations: ['+', '-',]
}
```

`GET /evaluate?expression=<string>` - evaluates math expression given via expression param


Response object:
```
{
    result: <number>
}
