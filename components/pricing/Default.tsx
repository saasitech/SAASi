import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PricingItem } from "./PricingList";

interface MarkerProps extends React.ComponentPropsWithoutRef<"div"> {
  muted?: boolean;
}

const mockFeatures = [
  { name: "2 team members", included: true },
  { name: "20GB Cloud storage", included: true },
  { name: "Integration help", included: true },
  { name: "Sketch Files", included: false },
  { name: "API Access", included: false },
  { name: "Complete documentation", included: false },
  { name: "24×7 phone & email support", included: false },
];

export const Marker = (props: MarkerProps) => (
  <div
    className={cn(
      "rounded-full",
      props.muted ? "" : "bg-primary/10 text-primary",
      props.className
    )}
    {...props}
  />
);

export default function PriceCardSimple({ item }: { item: PricingItem }) {
  return (
    <div className="w-full max-w-sm p-4 bg-gray-50 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto">
      <h5 className="mb-4 text-xl font-medium text-black dark:text-gray-400">
        {item.title}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">
          {item.price}
        </span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /month
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {mockFeatures.map((feature) => (
          <li className="flex items-center">
            <Marker muted={!feature.included}>
              <CheckCircleIcon className="w-5 h-5" />
            </Marker>

            <span
              className={cn(
                "text-base font-normal leading-tight text-primary-500 dark:text-primary-400 ms-3",
                !feature.included && "decoration-gray-500"
              )}
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary w-full"
        // className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Choose plan
      </button>
    </div>
  );
}
