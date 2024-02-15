import { colors } from "@/lib/colors";
import { usePricingStore } from "@/lib/store";
import { getTheme } from "@/lib/themes";
import { useState } from "react";
import { LogoUrlInput } from "./BrandingInputs";
import { ThemeItem } from "./ThemeItem";

export const ThemeCard = ({ theme, interactive = true }) => {
  const branding = usePricingStore((state) => state.branding);
  const styleProps = getTheme(theme, branding.colors);
  const [pickColor, setPickColor] = useState<string | null>(null);
  const [pickBrandDetails, setPickBrandDetails] = useState<boolean>(false);
  const setBranding = usePricingStore((state) => state.setBranding);

  const toggleBrandDetailsSwitch = () => {
    setPickBrandDetails(!pickBrandDetails);
  };
  const toggleColorSwitch =
    (color: null | string = null) =>
    (e) => {
      e.preventDefault();
      setPickColor(color);
    };
  return (
    <div className="border border-base-300 rounded-lg">
      {pickColor && interactive && (
        <div className="flex flex-col p-2 space-y-2">
          <div
            className="grid"
            style={{
              "gridTemplateColumns": "repeat(19, auto)",
            }}
          >
            {colors.map((c) => (
              <button
                type="button"
                key={c}
                className="rounded-full w-4 h-4 m-0.5"
                style={{ background: c }}
                onClick={(e) => {
                  e.preventDefault();
                  setPickColor(null);
                  if (
                    ["primary", "secondary", "accent", "neutral"].includes(
                      pickColor
                    )
                  ) {
                    setBranding({
                      colors: { ...branding.colors, [pickColor]: c },
                    });
                  }
                }}
              ></button>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-sm"
              onClick={toggleColorSwitch()}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {pickBrandDetails && interactive && (
        <div className="flex flex-col p-2 space-y-2">
          <LogoUrlInput />
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-sm"
              onClick={toggleBrandDetailsSwitch}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {!pickColor && !pickBrandDetails && (
        <ThemeItem
          theme={theme}
          styleProps={styleProps}
          interactive={interactive}
          onColorPick={toggleColorSwitch}
          onBrandDetailsPick={toggleBrandDetailsSwitch}
        />
      )}
    </div>
  );
};
