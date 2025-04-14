import Spinner from "@/components/atoms/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center space-y-2 animate-fade-in">
        <Spinner size="lg" />

        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
}
