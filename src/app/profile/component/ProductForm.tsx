import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function ProductForm({
  onFinish,
  setSelectedFiles,
  loading,
}: {
  onFinish: any;
  setSelectedFiles: SetStateAction<any>;
  loading: boolean;
}) {
  const { Option } = Select;

  const [categories, setCategories] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const response = await axios.post("/api/categories/get");
    setCategories(response.data.data);
  };

  const UploadButton = () => {
    return (
      <div>
        {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };

  return (
    <div>
      <Form name="nest-messages" onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Descrition"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={"price"}
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
            {categories.map((category: { name: string; _id: string }, key) => {
              return (
                <Option key={`category${key}`} value={category._id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name={"stock"}
          label="Count in Stock"
          rules={[{ type: "number", min: 0, required: true }]}
        >
          <InputNumber />
        </Form.Item>

        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          multiple
          beforeUpload={(file) => {
            const isJpgOrPng =
              file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) message.error("You can only upload JPG/PNG file!");
            else setSelectedFiles((x: any) => [...x, file]);

            return false;
          }}
          onChange={({ fileList }) => {
            setSelectedFiles(fileList);
          }}
        >
          <UploadButton />
        </Upload>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
