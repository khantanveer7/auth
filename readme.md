# Auth Using NodeJs & MongoDB

## API Reference

#### Sign Up

```http
  Post /api/signup
```

| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `name`     | `string` | **Required** User name     |
| `email`    | `string` | **Required** User email    |
| `password` | `string` | **Required** User password |

#### Sign In

```http
  Post /api/signin
```

| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `email`    | `string` | **Required** User email    |
| `password` | `string` | **Required** User password |

#### Sign Out

```http
  Get /api/signout
```

## Tech Stack

**Server:** Node, Express

**Database:** MongoDB
