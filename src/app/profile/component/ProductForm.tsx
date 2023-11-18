import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  UploadFile,
  message,
} from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { RcFile } from "antd/es/upload";

export default function ProductForm({
  onFinish,
  setSelectedFiles: setFileList,
  selectedFiles: fileList,
  loading,
  initValue,
}: {
  onFinish: any;
  selectedFiles: any[];
  setSelectedFiles: SetStateAction<any>;
  loading: boolean;
  initValue: any;
}) {
  const { Option } = Select;

  const [categories, setCategories] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <Form
        initialValues={initValue}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
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
          listType="picture-card"
          multiple
          fileList={fileList}
          onChange={({ fileList: newFileList }) => {
            setFileList(newFileList);
          }}
          onPreview={async (file: UploadFile) => {
            if (!file.url && !file.preview)
              file.preview = await getBase64(file.originFileObj as RcFile);

            setPreviewImage(file.url || (file.preview as string));
            setPreviewOpen(true);
            setPreviewTitle(
              file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
            );
          }}
          beforeUpload={(file) => {
            const isJpgOrPng =
              file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) message.error("You can only upload JPG/PNG file!");
            return false; //놀랍게도 이게 true면 그냥 전송된다...
          }}
        >
          <UploadButton />
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => {
            setPreviewOpen(false);
          }}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
