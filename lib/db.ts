import { neon } from "@neondatabase/serverless";

let sql: ReturnType<typeof neon> | null = null;

function getSql(): ReturnType<typeof neon> {
  if (!sql) {
    const connectionString =
      process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL or POSTGRES_URL is not configured",
      );
    }
    sql = neon(connectionString);
  }
  return sql;
}

export interface ReservationRecord {
  gift_url: string;
  guest_name: string;
}

async function ensureTable(): Promise<void> {
  await getSql()`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      gift_url TEXT UNIQUE NOT NULL,
      guest_name TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function getAllReservations(): Promise<ReservationRecord[]> {
  await ensureTable();
  const rows = await getSql()`
    SELECT gift_url, guest_name FROM reservations ORDER BY created_at
  `;
  return rows as ReservationRecord[];
}

export async function createReservation(
  giftUrl: string,
  guestName: string,
): Promise<{ ok: true } | { ok: false; reason: "conflict" | "error" }> {
  await ensureTable();
  try {
    await getSql()`
      INSERT INTO reservations (gift_url, guest_name)
      VALUES (${giftUrl}, ${guestName})
    `;
    return { ok: true };
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message.includes("unique") || err.message.includes("duplicate"))
    ) {
      return { ok: false, reason: "conflict" };
    }
    console.error("Failed to create reservation:", err);
    return { ok: false, reason: "error" };
  }
}
