import { Button, Table, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const columns = [
  { title: "제품", dataIndex: "image", key: "image" },
  { title: "제품명", dataIndex: "name", key: "name" },
  { title: "카테고리", dataIndex: "category", key: "category" },
  { title: "설명", dataIndex: "description", key: "description" },
  { title: "가격", dataIndex: "price", key: "price" },
  { title: "재고", dataIndex: "stock", key: "stock" },

  { title: " ", dataIndex: "button", key: "button" },
];

interface dataType {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  _id: string;
  images: [];
}
interface productType {
  key: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  button: any;
}

export default function ProductList() {
  const router = useRouter();

  const [datas, setDatas] = useState([]);
  const [products, setProducts] = useState<productType[]>([]);
  const [getLoading, setGetLoading] = useState(false);

  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = async () => {
    try {
      setGetLoading(true);
      const response = await axios.post("/api/products/get");
      setDatas(response.data.data);
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setGetLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setGetLoading(true);
      await axios.delete(`/api/products/${id}`);
      await getDatas();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    if (datas.length) {
      const processedData: productType[] = datas.map(
        (data: dataType, key: number) => {
          return {
            key: key,
            image: (
              <>
                {data.images.map((url: string, key2: number) => (
                  <Image
                    key={`image_${key}${key2}`}
                    src={url}
                    alt="image"
                    className="w-20 h-20 object-cover"
                    fill
                  />
                ))}
              </>
            ),
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            stock: data.stock,
            button: (
              <div key={key}>
                <Button
                  key={"del" + key}
                  onClick={() => {
                    deleteProduct(data._id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  key={"edit" + key}
                  type="primary"
                  onClick={() => {
                    // setEditModal(data);
                  }}
                >
                  Edit
                </Button>
              </div>
            ),
          };
        }
      );
      setProducts(processedData);
    }
  }, [datas]);

  return (
    <div>
      <Button
        onClick={() => {
          router.push("/profile/add_product");
        }}
      >
        Add Product
      </Button>

      <div>
        <Table
          columns={columns}
          dataSource={products}
          pagination={false}
          loading={getLoading}
        />
      </div>
    </div>
  );
}
