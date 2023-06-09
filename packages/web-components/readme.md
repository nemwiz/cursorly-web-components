[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

## Cursorly web components

This package hosts web components for [Cursorly](https:///cursorly.app) app.

## How to use

The easiest way to is to import via [Unpkg](https://www.unpkg.com/). 
 

In your `index.html` file:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Awesome app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge;"/>

    <script type="module" src="https://www.unpkg.com/@cursorly/web-components@0.0.6-alpha.4/dist/web-components/web-components.esm.js"></script>
  
</head>
<body>
</body>
</html>
```

If you want to bundle it with your framework, you can use the following.

- `yarn install @cursorly/web-components`
- Add this line of code somewhere in your main entry file
```typescript
import {defineCustomElements} from '@cursorly/web-components/dist/components/index';

defineCustomElements();
```

Once you import the components, you can use them in your HTML.

`<cursorly-spinner></cursorly-spinner>`

### Development

The web components are built with [StencilJS](https://stenciljs.com).
We also use [Storybook](https://storybook.js.org/) for building components in isolation.

To run this repo, open 2 terminals and run the following commands:

- `Terminal 1 -> yarn start`
- `Terminal 2 -> yarn storybook`
- Navigate to `http://localhost:6006` to see the components

To execute unit tests run `yarn test`.

There is also a handy script for creating new components. This script will
also create an accompanying story in Storybook. The usage is:

`./generate-component.sh my-component MyComponent`