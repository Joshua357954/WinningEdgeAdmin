"use client";

import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust the import path

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    investmentPercentage: "",
    adminPassword: "",
    investmentDuration: "",
    depositAccount: "",
    contactUs: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "admin", "settings");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, "admin", "settings"), settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update settings.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-3">Admin Settings</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Investment Percentage (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="investmentPercentage"
                  value={settings.investmentPercentage}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Investment Duration (Months)</label>
                <input
                  type="number"
                  className="form-control"
                  name="investmentDuration"
                  value={settings.investmentDuration}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Change Admin Password</label>
              <input
                type="password"
                className="form-control"
                name="adminPassword"
                value={settings.adminPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deposit Account Data</label>
              <input
                type="text"
                className="form-control"
                name="depositAccount"
                value={settings.depositAccount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Us Info</label>
              <textarea
                className="form-control"
                rows={3}
                name="contactUs"
                value={settings.contactUs}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
