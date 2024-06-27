// src/app/api/alerts/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Adjust the path to your Prisma client

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5, // Fetch the latest 5 alerts
      select: {
        id: true,
        title: true,
        description: true,
        fullDescription: true, // Include this field
        variant: true,
        createdAt: true,
      },
    });
    return NextResponse.json(alerts, { status: 200 });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Error fetching alerts' }, { status: 500 });
  }
}
