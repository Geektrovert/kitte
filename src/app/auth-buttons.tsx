"use client";

import { useState, type SVGProps } from "react";
import { Loader2, LogOut, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const GitHub = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 97.6 96"
    // style={{
    //   enableBackground: "new 0 0 97.6 96",
    // }}
    xmlSpace="preserve"
    width="1em"
    height="1em"
    {...props}
  >
    <style type="text/css">{"\n\t.st0{fill:#FFFFFF;}\n"}</style>
    <path
      className="st0"
      d="M48.9,0C21.8,0,0,22,0,49.2C0,71,14,89.4,33.4,95.9c2.4,0.5,3.3-1.1,3.3-2.4c0-1.1-0.1-5.1-0.1-9.1 c-13.6,2.9-16.4-5.9-16.4-5.9c-2.2-5.7-5.4-7.2-5.4-7.2c-4.4-3,0.3-3,0.3-3c4.9,0.3,7.5,5.1,7.5,5.1c4.4,7.5,11.4,5.4,14.2,4.1 c0.4-3.2,1.7-5.4,3.1-6.6c-10.8-1.1-22.2-5.4-22.2-24.3c0-5.4,1.9-9.8,5-13.2c-0.5-1.2-2.2-6.3,0.5-13c0,0,4.1-1.3,13.4,5.1 c3.9-1.1,8.1-1.6,12.2-1.6s8.3,0.6,12.2,1.6c9.3-6.4,13.4-5.1,13.4-5.1c2.7,6.8,1,11.8,0.5,13c3.2,3.4,5,7.8,5,13.2 c0,18.9-11.4,23.1-22.3,24.3c1.8,1.5,3.3,4.5,3.3,9.1c0,6.6-0.1,11.9-0.1,13.5c0,1.3,0.9,2.9,3.3,2.4C83.6,89.4,97.6,71,97.6,49.2 C97.7,22,75.8,0,48.9,0z"
    />
  </svg>
);

export function SignUpButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        authClient.signIn
          .social({ provider: "github", callbackURL: "/terminal" })
          .then(() => {
            setIsLoading(false);
          });
      }}
      className="font-mono"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
      ) : (
        <GitHub className="w-4 h-4 mr-1" />
      )}
      Try now!
    </Button>
  );
}

export function LogOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        authClient
          .signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/auth");
              },
            },
          })
          .then(() => {
            setIsLoading(false);
          });
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4 mr-1" />
      )}
      Log out
    </Button>
  );
}

export function UserButton() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return (
      <Button disabled>
        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        Loading user...
      </Button>
    );
  }

  if (error) {
    return (
      <Button variant="destructive" disabled>
        <AlertCircle className="w-4 h-4 mr-1 animate-spin" />
        Failed to load user...
      </Button>
    );
  }
  return (
    <Button variant="outline" size="lg">
      <Avatar className="w-6 h-6">
        <AvatarImage
          src={session?.user.image as string}
          alt={session?.user.name}
          className="rounded-full"
        />
        <AvatarFallback>
          {session?.user.name
            .split(" ")
            .map((name) => (name.length > 0 ? name[0] : ""))
            .join("")}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium">{session?.user.name}</span>
    </Button>
  );
}
