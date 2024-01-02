import { TierItem, usePricingStore } from "@/lib/store";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { ReactSortable } from "react-sortablejs";

export default function Features({ tier }: { tier: TierItem }) {
  const tiers = usePricingStore((state) => state.tiers);
  const setTiers = usePricingStore((state) => state.setTiers);
  const features = tier.features.filter((i) => i !== undefined);

  const setList = (newFeatures) => {
    tier.features = newFeatures.map((i, index) => ({
      id: index,
      name: i.name,
      included: i.included,
    }));
    setTiers([...tiers]);
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
                        setTiers(tiers);
                      }}
                      checked={feature.included}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  tier.features.splice(feature.id, 1);
                  setTiers([...tiers]);
                }}
              >
                <MinusCircleIcon className="h-6 w-6 " />
              </button>
            </div>
          );
        })}
      </ReactSortable>
    </div>
  );
}
