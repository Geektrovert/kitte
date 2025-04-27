import Image from "next/image";
import Link from "next/link";
import { SignUpButton } from "../auth-buttons";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Kitte</h1>
      <Image
        src="/logo.png"
        alt="Kitte"
        width={300}
        height={300}
        className="mb-10 size-48 rounded-3xl"
      />
      <div className="flex flex-col gap-3 items-center">
        <p className="font-medium text-center">
          A simple html to image generator (for now)
        </p>
        <p className="text-muted-foreground text-center">
          Kit-te - is a japaneese word meaning poststamp
        </p>
      </div>
      <Link href="/">
        <SignUpButton />
      </Link>
    </div>
  );
}
