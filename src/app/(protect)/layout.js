import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const ProtectLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Navbar></Navbar>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default ProtectLayout;
