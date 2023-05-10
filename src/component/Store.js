import React, { useState, useEffect } from "react";
import storeService from "../service/StoreService";
import { useParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const Store = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      const response = await storeService.getStoreById(storeId);
      const storeData = response.data;
      setStore(storeData);
    };
    fetchStore();
  }, [storeId]);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Container>
        <h1 className="my-3">Store Information</h1>

        <Table bordered className="table table-rounded">
          <thead>
            <tr class="table-dark">
              <th scope="col">Store Name</th>
              <th scope="col">Store Location</th>
              <th scope="col">Store Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{store.storeName}</td>
              <td>{store.storeLocation}</td>
              <td>{store.storeAddress}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </section>
  );
};

export default Store;
