"use client";

import { Button, Form, Input, Modal, Table, message } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CategoryEditModal from "./CategoryEditModal";

const columns = [
  { title: "카테고리명", dataIndex: "name", key: "name" },
  { title: "물품 수", dataIndex: "cnt", key: "cnt" },
  { title: " ", dataIndex: "button", key: "button" },
];

interface categoryType {
  name: string;
  cnt: number;
  button: any;
}

export default function CategoriesList() {
  const [datas, setDatas] = useState([]);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState<any>(null);

  const newRef = useRef(null);

  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = async () => {
    try {
      const response = await axios.post("/api/categories/get");
      setDatas(response.data.data);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const setNewCategory = async (value: any) => {
    if (value.name === "" || value.name === null) return;
    else {
      try {
        setLoading(true);
        await axios.post("/api/categories/set", value);
        await getDatas();
      } catch (e: any) {
        message.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      await getDatas();
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const editCategory = async (data: any) => {
    try {
      console.log(data);
      await axios.put(`/api/categories/${data._id}`, { ...data });
      await getDatas();
    } catch (e: any) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    if (datas.length) {
      const processedData: categoryType[] = datas.map(
        (data: { name: string; cnt: number; _id: string }) => {
          return {
            name: data.name,
            cnt: data.cnt,
            button: (
              <>
                <Button
                  onClick={() => {
                    deleteCategory(data._id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setEditModal(data);
                  }}
                >
                  Edit
                </Button>
              </>
            ),
          };
        }
      );
      setCategories(processedData);
    }
  }, [datas]);

  useEffect(() => {
    console.log(editModal);
  }, [editModal]);

  return (
    <div>
      <CategoryEditModal
        setEditModal={setEditModal}
        editCategory={editCategory}
        editData={editModal}
      />

      <div className="flex justify-end">
        <Form layout="inline" onFinish={setNewCategory}>
          <Form.Item name="name">
            <Input type="text" ref={newRef} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              add
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={categories} />
    </div>
  );
}
