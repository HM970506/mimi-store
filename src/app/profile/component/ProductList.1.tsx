import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProductList() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  return (
    <div>
      <Button
        onClick={() => {
          router.push("/profile/add_product");
        }}
      >
        Add Product
      </Button>
    </div>
  );
}
