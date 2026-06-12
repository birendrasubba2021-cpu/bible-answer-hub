export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-700",
    DRAFT: "bg-stone-100 text-stone-600",
    IN_REVIEW: "bg-amber-100 text-amber-700",
    ARCHIVED: "bg-red-100 text-red-700",
  };
  const label: Record<string, string> = {
    PUBLISHED: "Published",
    DRAFT: "Draft",
    IN_REVIEW: "In review",
    ARCHIVED: "Archived",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-stone-100 text-stone-600"
      }`}
    >
      {label[status] ?? status}
    </span>
  );
}
