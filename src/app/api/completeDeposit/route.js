import { firestore } from "@/utils/firebase";
import { doc, serverTimestamp, updateDoc, Timestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

const getFutureTimestamp = (duration) => {
  const units = { secs: 1000, mins: 60000, hours: 3600000, days: 86400000 };
  const match = duration.match(/^(\d+)(secs|mins|hours|days)$/);

  if (!match) return null; // Handle invalid input

  const [, value, unit] = match;
  return Timestamp.fromMillis(Date.now() + value * units[unit]);
};

export async function POST(req) {
  try {
    const { depositId } = await req.json();

    if (!depositId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const depositDocRef = doc(firestore, "deposits", depositId);
    await updateDoc(depositDocRef, {
      approvedByAdmin: true,
      datetime: serverTimestamp(),
      completionDate: getFutureTimestamp("30secs"),
    });

    return NextResponse.json({
      message: "Deposit request completed successfully",
    });
  } catch (error) {
    console.error("Error completing deposit request", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
