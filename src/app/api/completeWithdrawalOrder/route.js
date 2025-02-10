import { firestore } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { withdrawalRequestId, depositId } = await req.json();

    if (!withdrawalRequestId || !depositId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Update withdrawal request status
    const withdrawalDocRef = doc(firestore, "withdrawals", withdrawalRequestId);
    await updateDoc(withdrawalDocRef, {
      status: "complete",
      disbursementTime: new Date().toISOString(),
    });

    // Update deposit withdrawal status
    const depositDocRef = doc(firestore, "deposits", depositId);
    await updateDoc(depositDocRef, {
      withdrawalStatus: "SENT_TO_USER",
    });

    return NextResponse.json({ message: "Withdrawal request completed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error completing withdrawal request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
