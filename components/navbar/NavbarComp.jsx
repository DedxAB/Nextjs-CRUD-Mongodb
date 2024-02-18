"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavbarComp = () => {
  const { status, data: session } = useSession();
  // console.log(status, session?.user);
  const name = session?.user?.name;
  const email = session?.user?.email;

  let shortName = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="flex justify-between items-center py-3">
      <Link href={`/`}>
        <h1 className="font-bold text-2xl">
          Dedx<span className="text-orange-500">Notes</span>
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <ThemeToggle />
        {status === "authenticated" && (
          <>
            <Link href={`/add-topic`}>
              <Button className="font-bold rounded">Add Topic</Button>
            </Link>
          </>
        )}

        {status === "authenticated" ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={`${session?.user?.image}`} />
                <AvatarFallback>{shortName}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <p className="px-2 py-1">{name}</p>
              <p className="px-2 py-1">{email}</p>
              <DropdownMenuItem
                className={`cursor-pointer`}
                onClick={() => signOut()}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={`/signin`}>
            <Button variant={`outline`} className="font-bold rounded">
              Signin
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarComp;