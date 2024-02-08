import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    const billboard = prismadb.billboard

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    )
}