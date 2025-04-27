import { SignUpButton } from "@/app/auth-buttons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Auth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/terminal");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUpButton />
    </div>
  );
}
