import { NextRequest, NextResponse } from "next/server";
import { getAllReservations, createReservation } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const reservations = await getAllReservations();
    const accessKey = process.env.RESERVATIONS_ACCESS_KEY;
    const providedKey = request.nextUrl.searchParams.get("key");

    // If an access key is configured and the request provides it correctly,
    // return full data with guest names. Otherwise, only return reservation
    // status (which gifts are taken, but not by whom).
    const withNames = !accessKey || providedKey === accessKey;

    const data = withNames
      ? reservations
      : reservations.map((r) => ({ gift_url: r.gift_url }));

    return NextResponse.json({ reservations: data });
  } catch (err) {
    console.error("GET /api/reservations error:", err);
    return NextResponse.json({ reservations: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: { giftUrl?: string; guestName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido" },
      { status: 400 },
    );
  }

  const giftUrl = body.giftUrl?.trim();
  const guestName = body.guestName?.trim();

  if (!giftUrl) {
    return NextResponse.json(
      { error: "URL do presente é obrigatória" },
      { status: 400 },
    );
  }

  if (!guestName || guestName.length < 2) {
    return NextResponse.json(
      { error: "Nome deve ter pelo menos 2 caracteres" },
      { status: 400 },
    );
  }

  const result = await createReservation(giftUrl, guestName);

  if (result.ok) {
    return NextResponse.json({ reserved: true }, { status: 201 });
  }

  if (result.reason === "conflict") {
    return NextResponse.json(
      { error: "Este presente já foi reservado por outra pessoa" },
      { status: 409 },
    );
  }

  return NextResponse.json(
    { error: "Erro ao reservar. Tente novamente." },
    { status: 500 },
  );
}
