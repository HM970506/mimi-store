"use client";
import { Tabs, TabsProps } from "antd";
import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoriesList from "./component/CategoriesList";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "./component/ProductList.1";

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);

  const adminItem: TabsProps["items"] = [
    { key: "1", label: "Products", children: <ProductList /> },
    { key: "2", label: "Categories", children: <CategoriesList /> },
    { key: "3", label: "Orders", children: <div>Orders</div> },
    { key: "4", label: "Users", children: <div>Users</div> },
  ];

  const userItem = [
    { key: "1", label: "Orders", children: <div>Orders</div> },
    {
      key: "2",
      label: "Personal Information",
      children: <div>Personal Information</div>,
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const nowSection = searchParams.get("section") || "1";
  const [nowTab, setNowTab] = useState(nowSection);

  return (
    <Tabs
      defaultActiveKey="1"
      items={currentUser.isAdmin ? adminItem : userItem}
      activeKey={nowTab}
      onChange={(key) => {
        router.push(`/profile?section=${key}`);
        setNowTab(key);
      }}
    />
  );
}
