"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthFlashToasts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("signedIn") === "1") {
      toast.success("Signed in successfully.", { toastId: "auth-signed-in" });
      const next = new URLSearchParams(searchParams);
      next.delete("signedIn");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
      return;
    }

    if (searchParams.get("signedOut") === "1") {
      toast.success("Signed out successfully.", { toastId: "auth-signed-out" });
      const next = new URLSearchParams(searchParams);
      next.delete("signedOut");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }
  }, [pathname, router, searchParams]);

  return null;
}

export function AppToasts() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthFlashToasts />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
