import { NextResponse } from "next/server";
import { firestore } from "@/utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const withdrawalRequestsQuery = query(
      collection(firestore, "withdrawals"),
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(withdrawalRequestsQuery);

    const withdrawalRequests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log((withdrawalRequests, null, 2));

    return NextResponse.json([...withdrawalRequests], { status: 200 });
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
