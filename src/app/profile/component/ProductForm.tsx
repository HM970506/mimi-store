import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
export default function ProductForm() {
  const { Option } = Select;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const response = await axios.post("/api/categories/get");
    console.log(response);
    setCategories(response.data.data);
  };

  const onFinish = async () => {};
  return (
    <div>
      <Form name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "Description"]}
          label="Descrition"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={["user", "price"]}
          label="Price"
          rules={[{ type: "number", min: 0, required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Category">
            {categories.map((category: { name: string }, key) => {
              console.log(category);
              return (
                <Option key={`category${key}`} value={category.name}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name={["user", "stock"]}
          label="Count in Stock"
          rules={[{ type: "number", min: 0, required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          rules={[{ required: true }]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
