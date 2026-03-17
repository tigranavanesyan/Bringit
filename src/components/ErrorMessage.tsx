import { Button } from "./ui/Button";

interface ErrorMessageProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorMessage({
  message = "Unable to load products. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <p className="text-base text-(--color-error)">{message}</p>
      <Button variant="primary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
