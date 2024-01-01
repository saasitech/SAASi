import { TierFeature, TierItem, usePricingStore } from "@/lib/store";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { ReactSortable } from "react-sortablejs";

interface TierItemWithIndex extends TierFeature {
  id: number;
}
export default function Features({ tier }: { tier: TierItem }) {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  const features = tier.features.map((feature, index) => {
    const item = { ...feature, index, id: index };
    return item;
  });

  const setList = (newFeatures) => {
    tier.features = newFeatures.map((i) => ({
      name: i.name,
      included: i.included,
    }));
    setTiers(tiers);
  };

  return (
    <div>
      <label htmlFor="description" className="label-text">
        Features
      </label>
      <ReactSortable
        list={features}
        setList={setList}
        className="space-y-1 mt-2"
      >
        {features.map((feature) => {
          return (
            <div className="flex items-center space-x-2" key={feature.id}>
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  name="price-text"
                  className="input input-bordered input-saasi"
                  value={feature.name}
                  onChange={(e) => {
                    feature.name = e.target.value;
                    tier.features = [...features];
                    setTiers([...tiers]);
                  }}
                  autoFocus={feature.name === ""}
                />
                <div className="absolute right-2 space-x-1 flex items-center">
                  <div
                    className="tooltip"
                    data-tip={feature.included ? "Included" : "Excluded"}
                  >
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      onChange={(e) => {
                        feature.included = e.target.checked;
                        tier.features = [...features];
                        setTiers(tiers);
                      }}
                      checked={feature.included}
                    />
                  </div>
                </div>
              </div>
              {feature.id === tier.features.length - 1 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    tier.features = [
                      ...tier.features,
                      {
                        name: "",
                        included: false,
                      },
                    ];
                    setTiers([...tiers]);
                  }}
                >
                  <PlusCircleIcon className="h-6 w-6 text-primary" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    tier.features.splice(feature.id, 1);
                    setTiers([...tiers]);
                  }}
                >
                  <MinusCircleIcon className="h-6 w-6 " />
                </button>
              )}
            </div>
          );
        })}
      </ReactSortable>
    </div>
  );
}
