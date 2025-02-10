import { NextResponse } from "next/server";
import { firestore } from "@/utils/firebase"; // Ensure correct Firebase import
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req) {
  try {
    // Extract query parameters
    // const { searchParams } = new URL(req.url);
    // const userId = searchParams.get("userId");

    // if (!userId) {
    //   return NextResponse.json(
    //     { error: "userId is required" },
    //     { status: 400 }
    //   );
    // }

    // Query Firestore for unapproved deposits where withdrawalStatus is empty
    const depositRequestsQuery = query(
      collection(firestore, "deposits"),
      where("approvedByAdmin", "==", false),
      where("withdrawalStatus", "==", "") // Ensure this field exists in Firestore
    );

    const querySnapshot = await getDocs(depositRequestsQuery);
    const depositRequests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(depositRequests);

    return NextResponse.json([...depositRequests], { status: 200 });
  } catch (error) {
    console.error("Error fetching deposit requests:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
