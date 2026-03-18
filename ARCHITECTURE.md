# Architecture

This document describes the component structure, state management, and production-oriented improvements for the Bringit product catalog app.

## Component structure

The app is organized around a single root `App` that owns filter and pagination state and composes layout and content.

- **Layout and controls**: `HeaderControls` aggregates `SearchBar`, `CategoryFilter`, and `SortControl`. It is presentational; all state lives in `App` and is passed down via props.
- **Main content**: `ProductMainContent` receives loading/error state, paginated products, and pagination props from `App`. It conditionally renders a skeleton grid (`SkeletonCard`), an error view (`ErrorMessage` with retry), or the product grid plus `Pagination`. `ProductGrid` renders a list of `ProductCard` components; clicking a card triggers selection via context.
- **Product detail**: `ProductDetailModal` and `ProductGrid` are wrapped in `SelectedProductProvider`. The modal reads `selectedProduct` from context and renders inside a reusable `Modal` component when a product is selected.
- **Shared UI**: Reusable pieces live under `components/ui` (`Button`, `Input`, `Select`) and shared utilities in `utils` (e.g. `cn`, `filterProducts`).

Data flow is top-down: `App` fetches products via `useProducts`, applies filtering and sorting in `filterAndSortProducts`, paginates in memory, and passes the current page slice and callbacks to `ProductMainContent` and `HeaderControls`.

## State management

- **Server state**: Product list is fetched with Axios in `api/products.ts` and cached with **TanStack Query** in `useProducts`. Loading, error, and refetch are exposed to `App`; no manual cache or loading flags are needed.
- **UI and filter state**: Search input, category, sort option, and current page are held in `App` with `useState`. The search input is debounced via `useDebouncedValue` before being used in filtering.
- **Modal selection**: The currently selected product (for the detail modal) is stored in **React Context** (`SelectedProductContext`). A split context (setter-only vs. full state) avoids unnecessary re-renders for components that only need to open the modal.

## Production improvements

- **Empty results state**: When search/category filters return zero items, show a friendly “No results” message with a clear reset action (e.g. “Clear filters”) instead of an empty grid.
- **Modal UX + accessibility**: Move initial focus to the Close button on open, restore focus on close, and provide clear keyboard handling (Escape to close, keep focus within the dialog). Ensure overlay isn’t presented as a keyboard-activable “button”.
- **Preserve scroll position**: When opening/closing the modal, avoid jumpy page behavior and restore the user’s previous scroll position in the product list.
- **Responsive controls**: Make header controls stack gracefully on small screens (full-width inputs/selects), and ensure pagination is touch-friendly (larger hit targets, concise labels).
- **Image stability**: Reserve image space (fixed aspect ratio / consistent container height) to reduce layout shifts while images load, improving perceived quality.

