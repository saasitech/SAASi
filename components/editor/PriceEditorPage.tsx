"use client";
import { getTheme } from "@/lib/themes";
import { useParams } from "next/navigation";
import Form from "./Form";
import PriceList from "./PriceList";

const themeStyle = getTheme("dim");

export const PriceEditorPage = () => {
  const params = useParams<{ slug: string }>();
  return (
    <div
      className="pointer-events-auto max-w-md text-sm text-base-content min-w-[448px]"
      style={themeStyle}
    >
      {params?.slug ? <Form /> : <PriceList />}
    </div>
  );
};
