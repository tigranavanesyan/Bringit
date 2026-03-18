# Code explanation

This document explains key implementation choices: fetching logic, state management, search/filter behavior, and one performance improvement.

## Fetching logic

Products are loaded from the FakeStore API in two layers:

1. **API layer** (`src/api/products.ts`): A single function `fetchProducts()` uses Axios to `GET` `https://fakestoreapi.com/products` and returns the response data as `Promise<Product[]>`.
2. **Hook layer** (`src/hooks/useProducts.ts`): `useProducts()` wraps this with **TanStack Query** (`useQuery`). The query key is `["products"]`, so all components using `useProducts()` share the same cache. The hook exposes `products`, `loading`, `error`, and `refetch`, so the UI can show loading skeletons, error messages with retry, and the list without managing cache or request state manually.

No fetching happens in components; they only call `useProducts()` and react to the returned state.

## State management choice

- **Products (server state)**: TanStack Query is used so that the product list is cached, deduplicated, and refetchable. The app does not store products in React state or context; the source of truth is the query cache.
- **Selected product (modal)**: The product currently chosen for the detail modal is kept in **React Context** (`SelectedProductContext`). Context fits here because: (1) only a few components need it (the grid to set it, the modal to read it), and (2) the value is simple (one product or null). The context is split into a setter-only context and a full-state context so that components that only call `setSelectedProduct` (e.g. `ProductMainContent` / cards) do not re-render when the selected product changes—only the modal re-renders.

## Search and filter internals

- **Debouncing**: The user types into `SearchBar`, which updates `searchInput` in `App`. That value is passed through `useDebouncedValue(searchInput, 200)`, which returns a value that updates only after the user has stopped typing for 200 ms. Only this debounced value (`debouncedSearchQuery`) is used for filtering, which avoids running the filter on every keystroke and keeps the list stable while typing.
- **Filtering and sorting**: `filterAndSortProducts` in `src/utils/filterProducts.ts` takes the full product list, search query, category, and sort option. It filters by title (case-insensitive substring match using the trimmed, lowercased query), then by category (exact match), then sorts by price ascending or descending if a sort option is set. The result is a new array; the original list is not mutated. In `App`, this is wrapped in `useMemo` so it only recomputes when `products`, `debouncedSearchQuery`, `selectedCategory`, or `sortBy` change. Pagination is applied afterward by slicing the filtered array for the current page.

## One potential performance improvement

- **Code-split the modal**: lazily load `ProductDetailModal` (and heavy dependencies) so the initial bundle is smaller.
