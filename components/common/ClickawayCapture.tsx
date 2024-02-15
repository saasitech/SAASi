"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ClickawayCapture() {
  const listenerRef = useRef<any>(null);
  const pathName = usePathname();
  useEffect(() => {
    var details = [...document.querySelectorAll("details")];
    listenerRef.current = document.addEventListener("click", function (e) {
      const targetNode = e.target as Node;
      if (!details.some((f) => f.contains(targetNode))) {
        details.forEach((f) => f.removeAttribute("open"));
      }
    });
    return () => {
      document.removeEventListener("click", listenerRef.current);
    };
  }, [pathName]);

  return null;
}
