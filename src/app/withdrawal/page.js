"use client";

import Image from "next/image";
import Sidebar from "@/components/sidebar";
import TheHead from "@/components/theHead";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { prettifyAmountInNaira } from "@/utils/fn";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader1"; // Make sure you have a Loader component
import toast from "react-hot-toast";

export default function Withdrawal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/getWithdrawalOrders")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setUsers([]); // Use an empty array in case of error
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      });
  }, []);

  async function completeWithdrawals(withdrawalRequestId, depositId) {
    console.log(withdrawalRequestId, depositId);
    const confirmWithdrawal = confirm(
      "Are you sure you want to complete this Withdrawal?"
    );
    if (!confirmWithdrawal) return;

    try {
      await axios.post("/api/completeWithdrawalOrder", {
        withdrawalRequestId,
        depositId,
      });

      toast.success("Withdrawal completed successfully!");

      // Remove the completed withdrawal from the state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== withdrawalRequestId)
      );
    } catch (error) {
      console.error("Error completing Withdrawal:", error);
      toast.error("Failed to complete Withdrawal. Please try again.");
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Loader loading={loading} /> {/* Show loader while loading */}
      <TheHead />
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar />
        <div className="mx-auto p-4">
          <h2 className="text-xl font-bold mb-4">Withdrawal Orders</h2>

          {/* Empty State / Loading State */}
          {loading ? (
            <div className="text-center py-10">
              <span>Loading...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10">
              <span>No withdrawal orders available.</span>
            </div>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">USER ID</th>
                  <th className="border p-2">Ac. Name</th>
                  <th className="border p-2">Ac. Number</th>
                  <th className="border p-2">Bank Name</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{item.user_id}</td>
                    <td className="border p-2">{item.account_name}</td>
                    <td className="border p-2 text-center">
                      {item.account_number}
                    </td>
                    <td className="border p-2 text-center">{item.bank_name}</td>
                    <td className="border p-2 text-center">
                      {prettifyAmountInNaira(item.amount)}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() =>
                          completeWithdrawals(item.id, item.deposit_id)
                        }
                        className="bg-red-500 btn btn-warning text-white px-3 py-1 rounded"
                      >
                        Approve
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
