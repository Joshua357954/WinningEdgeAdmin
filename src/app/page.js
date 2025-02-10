"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "@/components/sidebar";
import TheHead from "@/components/theHead";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import axios from "axios";
import { prettifyAmountInNaira } from "@/utils/fn";
import Loader1 from "@/components/Loader1";
import toast from "react-hot-toast";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((response) => {
        setData(response?.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data");
        setLoading(false); // Also stop loading in case of an error
      });
  }, []);

  return (
    <>
      <Loader1 loading={loading} />
      <TheHead />
      <div className={styles.page} style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Navbar />

          <div className="container-fluid">
            {/* <!-- Page Heading --> */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>

            {/* <!-- Content Row --> */}
            <div className="row">
              {/* No Of Users */}
              <Card
                title="No Of Users"
                value={data?.noOfUsers}
                icon="fas fa-users"
                borderColor="primary"
              />

              {/* Total Deposit */}
              <Card
                title="Total Deposit"
                value={`${prettifyAmountInNaira(data?.totalDeposit)}`}
                icon="fas fa-wallet"
                borderColor="success"
              />

              {/* Total Withdrawal */}
              <Card
                title="Total Withdrawal"
                value={`${prettifyAmountInNaira(data?.totalWithdrawal)}`}
                icon="fas fa-money-bill-wave"
                borderColor="info"
              />

              {/* Total Profit Paid Out */}
              <Card
                title="Total Profit Paid Out"
                value={`${prettifyAmountInNaira(data?.totalProfitPaidOut)}`}
                icon="fas fa-chart-line"
                borderColor="warning"
              />
            </div>

            {/* <!-- Approach --> */}
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Winning Edge Sport Investment Admin Panel
                </h6>
              </div>
              <div className="card-body">
                <p>
                  The Winning Edge Sport Investment Admin Panel provides
                  administrators with the tools to manage user accounts, monitor
                  transactions, and oversee investment activities. This panel
                  ensures smooth operations and enhances decision-making through
                  real-time data and analytics.
                </p>
                <p className="mb-0">
                  Admins should regularly review user activity, confirm deposits
                  and withdrawals, and utilize reports to optimize platform
                  performance. Stay informed and maintain a seamless investment
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
