"use client";
import { useState } from "react";
import {
  FaLaughWink,
  FaTachometerAlt,
  FaCog,
  FaWrench,
  FaFolder,
  FaChartArea,
  FaTable,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh"></i>
        </div>
        <div class="sidebar-brand-text mx-3">W/E ADMIN</div>
      </a>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li class="nav-item">
        <a class="nav-link" href="/">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* <!-- Divider --> */}
      <hr class="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div class="sidebar-heading">Finance Mgt.</div>

      {/* <!-- Nav Item - Deposit --> */}
      <li className="nav-item active">
        <a className="nav-link" href="/deposit">
          <i className="fas fa-fw fa-money-bill-wave"></i>{" "}
          {/* Icon for deposit */}
          <span>Deposit</span>
        </a>
      </li>

      {/* <!-- Nav Item - Withdrawals --> */}
      <li className="nav-item active">
        <a className="nav-link" href="/withdrawal">
          <i className="fas fa-fw fa-wallet"></i> {/* Icon for withdrawals */}
          <span>Withdrawals</span>
        </a>
      </li>
    </ul>
  );
};

export default Sidebar;
