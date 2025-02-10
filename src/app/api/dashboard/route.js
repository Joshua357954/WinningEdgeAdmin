import { firestore } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Get total number of users
    const usersSnapshot = await getDocs(collection(firestore, "users"));
    const noOfUsers = usersSnapshot.size;

    // Get total deposits
    const depositsSnapshot = await getDocs(collection(firestore, "deposits"));
    const totalDeposit = depositsSnapshot.docs.reduce(
      (sum, doc) => sum + Number(doc.data().amount || 0),
      0
    );

    // Get total withdrawals with status IN_PROGRESS or SENT_TO_USER
    const withdrawalsQuery = query(
      collection(firestore, "withdrawals"),
      where("withdrawalStatus", "in", ["IN_PROGRESS", "SENT_TO_USER"])
    );
    const withdrawalsSnapshot = await getDocs(withdrawalsQuery);
    const totalWithdrawal = withdrawalsSnapshot.docs.reduce(
      (sum, doc) => sum + Number(doc.data().amount || 0),
      0
    );

    // Get total profit paid out
    const totalProfitQuery = query(
      collection(firestore, "deposits"),
      where("withdrawalStatus", "==", "SENT_TO_USER")
    );

    const profitSnapshot = await getDocs(totalProfitQuery);

    const totalProfitPaidOut = profitSnapshot.docs.reduce(
      (sum, doc) => sum + Number(doc.data().totalAmount || 0), // Assuming totalAmount
      0
    );

    // Construct the response object
    const dashboardData = {
      noOfUsers,
      totalDeposit,
      totalWithdrawal,
      totalProfitPaidOut,
    };

    // Send response
    return NextResponse.json({ ...dashboardData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
