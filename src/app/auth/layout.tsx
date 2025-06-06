import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/"); // Redirect to home if user is authenticated
  }
  console.log("Session in AuthLayout:", session);
  return (
    <div>
      <main className="flex justify-center">
        <div className="w-full sm:w-[350px] px-10">{children}</div>
      </main>
    </div>
  );
}
