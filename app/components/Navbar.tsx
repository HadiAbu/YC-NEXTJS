import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm ">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={25} height={10} />
        </Link>
        <div>
          {session && session?.user ? (
            <>
              <Link href="/startup/create">Create</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="text-2xl">
                  Sign Out
                </button>
              </form>
              <span className="ml-4">Hello, {session.user.name}</span>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="px-4 py-2 bg-white text-black rounded hover:bg-gray-700 transition"
            >
              <button type="submit" className="text-2xl">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
