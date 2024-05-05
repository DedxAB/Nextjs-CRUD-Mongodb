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
} from "../ui/custom-dropdown-menu";
import {
  CircleUserRound,
  LogIn,
  LogOut,
  NotebookPen,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { playfair_font } from "@/utils/fonts";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { status, data: session } = useSession();
  const { theme } = useTheme();

  useEffect(() => {
    let timeoutId;

    if (openSearch) {
      timeoutId = setTimeout(() => {
        if (searchText.length === 0) {
          setOpenSearch(false);
        }
      }, 6000); // Close search after 6 seconds of inactivity
    }

    return () => clearTimeout(timeoutId);
  }, [openSearch, searchText]);

  const hadleSearchInput = (e) => {
    e.preventDefault();
    if (searchText.length > 0) {
      router.push(`/result?q=${searchText}`);
    }
    setTimeout(() => {
      setOpenSearch(!openSearch);
      setSearchText("");
    }, 300);
  };

  const name = session?.user?.name;
  let shortName = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <nav className="max-w-3xl relative mx-auto px-4 flex justify-between items-center py-4">
      <Link href={`/`}>
        <h1 className={`font-bold text-2xl md:text-3xl ${playfair_font}`}>
          Dedx
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Notes
          </span>
        </h1>
      </Link>
      {status === "loading" ? (
        <>
          <div className="flex space-x-2 h-9 items-center mr-6">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpenSearch(!openSearch)}
          >
            <Search className="w-5 h-5" />
          </Button>
          {/* Theme changing component  */}
          <ThemeToggle />
          {status === "authenticated" && (
            <Link href={`/create-note`}>
              <Button className="hidden md:font-bold md:flex md:gap-1 md:items-center">
                <NotebookPen className="w-4 h-4" />
                <span>Write</span>
              </Button>
              <Button className="font-bold md:hidden" size="icon">
                <NotebookPen className="w-4 h-4" />
              </Button>
            </Link>
          )}

          {/* Dropdown menu for user profile */}
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={session?.user?.image || "/logo.png"}
                    alt={`Profile image of ${session?.user?.name}`}
                  />
                  <AvatarFallback>{shortName}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`font-bold`}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session?.user?.isAdmin ? (
                  <DropdownMenuItem
                    className={`cursor-pointer`}
                    onClick={() =>
                      router.push(`/admin/${session?.user?.id}/details`)
                    }
                  >
                    <CircleUserRound className="w-4 h-4 mr-2" />
                    <span>Admin</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className={`cursor-pointer flex items-center space-x-2`}
                    onClick={() =>
                      router.push(`/profile/${session?.user?.id}/details`)
                    }
                  >
                    <CircleUserRound className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => router.push(`/about`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    className="w-4 h-4 "
                    viewBox="0 0 50 50"
                  >
                    <path d="M 25 1 C 11.222656 1 0 10.878906 0 23.1875 C 0 29.234375 2.773438 34.664063 7.21875 38.6875 C 6.546875 40.761719 5.046875 42.398438 3.53125 43.65625 C 2.714844 44.332031 1.933594 44.910156 1.3125 45.46875 C 1.003906 45.746094 0.722656 46.027344 0.5 46.375 C 0.277344 46.722656 0.078125 47.21875 0.21875 47.75 L 0.34375 48.15625 L 0.6875 48.375 C 1.976563 49.117188 3.582031 49.246094 5.3125 49.125 C 7.042969 49.003906 8.929688 48.605469 10.78125 48.09375 C 14.375 47.101563 17.75 45.6875 19.53125 44.90625 C 21.289063 45.273438 23.054688 45.5 24.90625 45.5 C 38.683594 45.5 49.90625 35.621094 49.90625 23.3125 C 49.90625 11.007813 38.78125 1 25 1 Z M 25 3 C 37.820313 3 47.90625 12.214844 47.90625 23.3125 C 47.90625 34.402344 37.730469 43.5 24.90625 43.5 C 23.078125 43.5 21.355469 43.320313 19.625 42.9375 L 19.28125 42.84375 L 19 43 C 17.328125 43.738281 13.792969 45.179688 10.25 46.15625 C 8.476563 46.644531 6.710938 47.019531 5.1875 47.125 C 4.167969 47.195313 3.539063 46.953125 2.84375 46.78125 C 3.339844 46.355469 4.019531 45.847656 4.8125 45.1875 C 6.554688 43.742188 8.644531 41.730469 9.375 38.75 L 9.53125 38.125 L 9.03125 37.75 C 4.625 34.015625 2 28.875 2 23.1875 C 2 12.097656 12.175781 3 25 3 Z M 23.8125 12.8125 C 23.511719 12.8125 23.40625 12.988281 23.40625 13.1875 L 23.40625 15.8125 C 23.40625 16.113281 23.613281 16.1875 23.8125 16.1875 L 26.1875 16.1875 C 26.488281 16.1875 26.59375 16.011719 26.59375 15.8125 L 26.59375 13.1875 C 26.59375 12.886719 26.386719 12.8125 26.1875 12.8125 Z M 23.90625 20.09375 C 23.605469 20.09375 23.5 20.300781 23.5 20.5 L 23.5 33.90625 C 23.5 34.207031 23.707031 34.3125 23.90625 34.3125 L 23.90625 34.40625 L 26.1875 34.40625 C 26.488281 34.40625 26.59375 34.199219 26.59375 34 L 26.59375 20.5 C 26.59375 20.199219 26.386719 20.09375 26.1875 20.09375 Z"></path>
                  </svg>
                  <span>About</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center space-x-2`}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="w-4 h-4 text-primary" />
                  <span className="text-primary">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Link href={`/signin`}>
                <Button size="icon">
                  <LogIn className="w-4" />
                </Button>
              </Link>
              <Button
                variant={`outline`}
                size="icon"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="w-4 text-red-500" />
              </Button>
            </div>
          )}
        </div>
      )}
      {openSearch && (
        <div className="w-full px-4 absolute top-[.83rem] left-0">
          {/* Content */}
          <div className="w-full flex items-center z-20">
            <form onSubmit={hadleSearchInput} className="w-full">
              <Input
                ref={(input) => input && input.focus()}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                name="search"
                type="text"
                placeholder={`Search user, notes, keywords...`}
                className={`font-bold px-4 py-5 rounded-lg text-base ${
                  theme === "system"
                    ? window.matchMedia &&
                      window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "bg-black"
                      : "bg-white"
                    : theme === "light"
                    ? "bg-white"
                    : "bg-black"
                }`}
              />
            </form>
            <Button
              size="icon"
              className={`h-[2.69rem] w-12 ml-2 rounded-lg`}
              onClick={() => {
                setOpenSearch(!openSearch);
                setSearchText("");
              }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
