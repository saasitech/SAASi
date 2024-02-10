import { Marker } from "@/components/common/Marker";
import { TierItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

export const Features = (tier: TierItem) => {
  return (
    <ul role="list" className="space-y-4">
      {tier.features.map((feature) => {
        return (
          <li className="flex items-center" key={feature.id}>
            <Marker
              muted={
                feature.included === undefined || feature.included === false
              }
            >
              {feature.included ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <MinusCircleIcon className="w-5 h-5 opacity-50" />
              )}
            </Marker>

            <span
              className={cn(
                "text-base font-normal leading-tight text-base-content ms-3",
                feature.included === undefined || feature.included === false
                  ? "opacity-50"
                  : ""
              )}
            >
              {feature.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
