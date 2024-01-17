import { TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Actions = (item: TierItem) => {
  return (
    <div
      className={cn(
        "grid gap-4",
        item.buttons.length === 1 && "grid-cols-1",
        item.buttons.length === 2 && "grid-cols-2"
      )}
    >
      {item.buttons.map((button) => (
        <div key={button.name} className="w-full">
          <button className="btn btn-secondary w-full">{button.name}</button>
        </div>
      ))}
    </div>
  );
};
