import { TierItem } from "@/lib/types";

export const Title = (item: TierItem) => {
  return (
    <div className="flex text-left w-full">
      <h5 className="flex-1 text-2xl font-bold text-black/80 dark:text-white/80">
        {item.title}
      </h5>
    </div>
  );
};
