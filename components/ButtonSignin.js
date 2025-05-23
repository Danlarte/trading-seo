/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config";
import { useCallback } from "react";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({ text = "Iniciar sesión", extraStyle }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = useCallback(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      const currentPath = window.location.pathname + window.location.search;
      router.push(
        `${config.auth.loginUrl}?callbackUrl=${encodeURIComponent(currentPath)}`
      );
    }
  }, [status, router]);

  if (status === "authenticated") {
    return (
      <Link href="/dashboard" className={`btn ${extraStyle ? extraStyle : ""}`}>
        {session.user?.image ? (
          <img
            src={session.user?.image}
            alt={session.user?.name || "Cuenta"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-[#54BCAF] flex justify-center items-center rounded-full shrink-0 text-white">
            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
          </span>
        )}
        {session.user?.name || session.user?.email || "Cuenta"}
      </Link>
    );
  }

  return (
    <button
      className={`bg-[#54BCAF] hover:bg-[#17498A] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ${
        extraStyle ? extraStyle : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ButtonSignin;
