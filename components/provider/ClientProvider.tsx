"use client";
import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { ModalProvider } from "../context/ModalContext";

type Props = {
  children: React.ReactNode;
};

export default function ClientProvider({ children }: Props) {
  const queryClient = new QueryClient();
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <ReduxProvider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
