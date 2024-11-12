import { prisma } from "@/lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const forageData = await prisma.forageData.create({
      data: {
        ...data,
        date: new Date(data.date),
        projectId: data.projectId,
      },
    });

    return NextResponse.json(forageData);
  } catch (error) {
    console.error("Error creating forage data:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}