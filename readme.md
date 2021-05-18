## Getting started

```shell
yarn --frozen-lockfile
```

```shell
yarn dev
```

## Notes

- In a slightly more "real" environment, I'd use [Fuse.js](https://fusejs.io/) to refine the returned API results. It's a nice, reliable little JS fuzzy search library but using it here seemed like a shortcut.
- Components should be tested using Jest + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). The most critical functionality to test in this implementation would be the `refineSearchResults` function since it's so core to our expected behavior.
- `Autocomplete` in its current form isn't very reusable. It could be made reuable fairly easily, but that wasn't my goal in this implementation.
- The project needs linting with ESLint.
- Why Vite instead of Webpack? I think it's a cool little build tool and more than anything it's _fast_. I know a lot of people reach for Webpack because it's the industry standard, but I think Vite brings some really exciting concepts to the table.
