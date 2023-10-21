import { Modal, Form, Input } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function CategoryEditModal({
  setEditModal,
  editCategory,
  editData,
}: {
  setEditModal: Dispatch<SetStateAction<any>>;
  editCategory: (id: string) => Promise<void>;
  editData: any;
}) {
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputRef.current && editData !== null)
      inputRef.current!.focus({ cursor: "all" });
  }, [editData]);

  const onFinish = async (valuse: any) => {
    setLoading(true);
    await editCategory({ ...editData, name: valuse.name });
    setLoading(false);
    setEditModal(null);
  };
  return (
    <Modal
      title="category edit"
      open={editData !== null}
      okText="Save"
      onOk={form.submit}
      onCancel={() => {
        setEditModal(null);
      }}
      closable={false}
      confirmLoading={loading}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name">
          <Input type="text" defaultValue={editData?.name} ref={inputRef} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
