"use client";

import Image from "next/image";
import Sidebar from "@/components/sidebar";
import TheHead from "@/components/theHead";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { prettifyAmountInNaira } from "@/utils/fn";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader1";
import toast from "react-hot-toast";

export default function Withdrawal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    axios
      .get("/api/getDepositOrders")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  async function completeDeposit(depositId) {
    const confirmDeposit = confirm(
      "Are you sure you want to complete this deposit?"
    );
    if (!confirmDeposit) return;

    try {
      const response = await axios.post("/api/completeDeposit", { depositId });
      toast.success("Deposit completed successfully!");

      // Remove the completed deposit from the state
      setUsers((prevUsers) =>
        prevUsers.filter((order) => order.id !== depositId)
      );
    } catch (error) {
      console.error("Error completing deposit:", error);
      toast.error("Failed to complete deposit. Please try again.");
    }
  }

  return (
    <div style={{ display: "flex" }}>
      {/* Display the loader when data is being fetched */}
      <Loader loading={loading} />
      <TheHead />
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar />
        <div className="mx-auto p-4">
          <h2 className="text-xl font-bold mb-4">Deposit Orders</h2>

          {/* If loading, show loader */}
          {loading ? (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          ) : users.length === 0 ? (
            // If there are no users (empty state)
            <div className="text-center">
              <p>No deposit orders available</p>
            </div>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">User ID</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Daily Profit</th>
                  <th className="border p-2">Total Profit</th>
                  <th className="border p-2">Total Amount</th>
                  <th className="border p-2">Completion Date</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="border p-2">{order.userId}</td>
                    <td className="border p-2 text-center">
                      {prettifyAmountInNaira(order.amount)}
                    </td>
                    <td className="border p-2 text-center">
                      {prettifyAmountInNaira(order.dailyProfit)}
                    </td>
                    <td className="border p-2 text-center">
                      {prettifyAmountInNaira(order.totalProfit)}
                    </td>
                    <td className="border p-2 text-center">
                      {prettifyAmountInNaira(order.totalAmount)}
                    </td>
                    <td className="border p-2 text-center">
                      {order.completionDate
                        ? new Date(
                            order.completionDate.seconds * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="border p-2 text-center">Pending</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => completeDeposit(order.id)}
                        className="px-3 py-1 rounded btn btn-danger"
                      >
                        {order.approvedByAdmin ? "Approved" : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
