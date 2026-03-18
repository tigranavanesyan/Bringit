import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../types/product";

type SelectedProductStateValue = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
};

const SetSelectedProductContext = createContext<((product: Product | null) => void) | null>(null);
const SelectedProductStateContext = createContext<SelectedProductStateValue | null>(null);

export function SelectedProductProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  return (
    <SetSelectedProductContext.Provider value={setSelectedProduct}>
      <SelectedProductStateContext.Provider value={{ selectedProduct, setSelectedProduct }}>
        {children}
      </SelectedProductStateContext.Provider>
    </SetSelectedProductContext.Provider>
  );
}

/** Use only when you need setSelectedProduct. Does not re-render when selectedProduct changes. */
export function useSetSelectedProduct(): (product: Product | null) => void {
  const value = useContext(SetSelectedProductContext);
  if (value === null) {
    throw new Error("useSetSelectedProduct must be used within SelectedProductProvider");
  }
  return value;
}

/** Use when you need selectedProduct (e.g. modal). Re-renders when selectedProduct changes. */
export function useSelectedProduct(): SelectedProductStateValue {
  const value = useContext(SelectedProductStateContext);
  if (value === null) {
    throw new Error("useSelectedProduct must be used within SelectedProductProvider");
  }
  return value;
}
