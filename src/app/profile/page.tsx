"use client";
import { Tabs } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <Tabs defaultActiveKey="1">
      {currentUser.isAdmin ? (
        <>
          <Tabs.TabPane tab="Products" key="1">
            Products
          </Tabs.TabPane>
          <Tabs.TabPane tab="Categories" key="2">
            Categories
          </Tabs.TabPane>
          <Tabs.TabPane tab="Orders" key="3">
            Orders
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="4">
            Users
          </Tabs.TabPane>
        </>
      ) : (
        <>
          <Tabs.TabPane tab="Orders" key="1">
            Orders
          </Tabs.TabPane>
          <Tabs.TabPane tab="Personal Information" key="2">
            Personal Information
          </Tabs.TabPane>
        </>
      )}
    </Tabs>
  );
}
