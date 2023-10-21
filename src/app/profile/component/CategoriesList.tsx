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
  const [delLoading, setDelLoading] = useState(false); //여러개의 로딩상태를 띄우려면, 단순 id만 넣어서는 안됨
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
      setDelLoading(true); //왜 안먹히지
      await axios.delete(`/api/categories/${id}`);
      await getDatas();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setDelLoading(false);
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
    console.log(delLoading);
  }, [delLoading]);

  useEffect(() => {
    if (datas.length) {
      const processedData: categoryType[] = datas.map(
        (data: { name: string; cnt: number; _id: string }, key: number) => {
          return {
            name: data.name,
            cnt: data.cnt,
            button: (
              <div key={key}>
                <Button
                  onClick={() => {
                    setDelLoading(true);
                    deleteCategory(data._id);
                  }}
                  loading={delLoading}
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
              </div>
            ),
          };
        }
      );
      setCategories(processedData);
    }
  }, [datas]);

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
