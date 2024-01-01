"use client";
import { getTheme } from "@/lib/themes";
import { useRouter } from "next/navigation";
import { ActionButtons } from "./ActionButtons";
import { BillingCycleSwitch } from "./BillingCycleSwitch";
import { CurrencySelect } from "./CurrencySelect";
import { DescriptionInput } from "./DescriptionInput";
import { EditorHeader } from "./EditorHeader";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceTitleInput } from "./TitleInput";
import { TiersManager } from "./tiers/TiersManager";

const themeStyle = getTheme("dim");

export const PriceEditor = () => {
  const router = useRouter();
  const closePanel = () => {
    router.push("/");
  };

  return (
    <div
      className="pointer-events-auto max-w-md text-sm text-base-content"
      style={themeStyle}
    >
      <form className="flex h-full flex-col bg-slate-700 shadow-xl">
        <EditorHeader onClose={closePanel} />
        <div className="space-y-4 my-2 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white overflow-y-auto">
          <PriceTitleInput />
          <DescriptionInput />
          <ThemeDropdown />
          <BillingCycleSwitch />
          <CurrencySelect />
          <TiersManager />
        </div>
        <ActionButtons onClose={closePanel} />
      </form>
    </div>
  );
};
