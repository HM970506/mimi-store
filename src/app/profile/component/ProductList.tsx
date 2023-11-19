import { Button, Carousel, Table, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { removeBeforeData } from "@/helpers/imageHandling";

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
  price: number;
  stock: number;
  button: any;
}

export default function ProductList() {
  const router = useRouter();

  const [datas, setDatas] = useState([]);
  const [products, setProducts] = useState<productType[]>([]);
  const [categories, setCategories] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  const columns = [
    { title: "제품", dataIndex: "image", key: "image" },
    {
      title: "제품명",
      dataIndex: "name",
      key: "name",

      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
      onFilter: (value: string, record: any) => {
        return record.category === value;
      },

      filters: categories.map((category: any) => {
        return { text: category.name, value: category.name };
      }),
    },
    {
      title: "설명",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },
    {
      title: "가격",
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) =>
        parseInt(a.price.replaceAll(",", "")) <
        parseInt(b.price.replaceAll(",", ""))
          ? 1
          : -1,
    },
    {
      title: "재고",
      dataIndex: "stock",
      key: "stock",
      sorter: (a: any, b: any) => (a < b ? 1 : -1),
    },

    { title: " ", dataIndex: "button", key: "button" },
  ];

  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = async () => {
    try {
      setGetLoading(true);
      const response = await axios.post("/api/products/get");
      const response2 = await axios.post("/api/categories/get");
      setDatas(response.data.data);
      setCategories(response2.data.data);
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setGetLoading(false);
    }
  };

  const deleteProduct = async (id: string, name: string) => {
    try {
      setGetLoading(true);
      await axios.delete(`/api/products/${id}`);
      await removeBeforeData(name);

      await getDatas();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(datas)) {
      const processedData: productType[] = datas.map(
        (data: dataType, key: number) => {
          return {
            key: key,
            image: (
              <Carousel
                dotPosition="bottom"
                style={{ width: "100px", height: "100px" }}
              >
                {data.images.map((url: string, key2: number) => (
                  <div key={`image_${key}${key2}`}>
                    <Image src={url} alt="image" width={100} height={100} />
                  </div>
                ))}
              </Carousel>
            ),
            name: data.name,
            category:
              categories[
                categories.findIndex(
                  (value: any) => value._id === data.category
                )
              ].name,
            description: data.description,
            price: data.price.toLocaleString(),
            stock: data.stock,
            button: (
              <div key={key}>
                <Button
                  key={"del" + key}
                  onClick={() => {
                    deleteProduct(data._id, data.name);
                  }}
                >
                  Delete
                </Button>
                <Button
                  key={"edit" + key}
                  type="primary"
                  onClick={() => {
                    router.push(`/profile/edit_product/${data._id}`);
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
          onChange={async (pagination, filters, sorter: any) => {}}
        />
      </div>
    </div>
  );
}
