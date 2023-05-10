import React, { useState, useEffect } from "react";
import StoreService from "../service/StoreService";
import { Table, Container, Row, Col } from "react-bootstrap";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useParams} from "react-router-dom";
import DeleteModal from "./Modal/DeleteModal";
import StoreForm from "./Modal/StoreForm";
import storeService from "../service/StoreService";
import SearchBar from "./SearchBar";

const StoreTable = () => {
  const {keyword} = useParams();
  const [stores, setStores] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeToUpdate, setStoreToUpdate] = useState(null);

  const storeData = () =>{
    if(keyword){
      StoreService.searchStore(keyword).then((response) => {
        setStores(response.data);
      });
    }else{
      StoreService.viewStore().then((response) => {
        setStores(response.data);
      });
    } 
  }
  useEffect(() => {
    storeData();
  }, [keyword]);

  const showDeleteConfirmation = (storeId) => {
    setStoreToDelete(storeId);
    setShowDeleteModal(true);
  };

  const deleteStore = (storeId) => {
    StoreService.deleteStore(storeId).then(() => {
      setStores((prevStores) =>
        prevStores.filter((store) => store.storeId !== storeId)
      );
      setShowDeleteModal(false);
    });
  };

  const showStore = (store) => {
    if(store){
      setStoreToUpdate(store);
    }else{
      setStoreToUpdate(null);
    }
    setShowStoreForm(true);
  };

  const saveUpdateStore = (store) =>{
    if(store.storeId){
      storeService.updateStore(store).then(() => {
        storeService.viewStore().then((response) => {
          setStores(response.data);
        });
      });
    }else{
      storeService.saveStore(store).then(() => {
        storeService.viewStore().then((response) => {
          setStores(response.data);
        });
      });
    }
  }

  return (
    <section>
      <Container>
        <Row className="my-3 align-items-center">
          <Col xs={12} md={4} lg={3}>
            <h1>Stores Table</h1>
          </Col>
          <Col xs={8} md={5} lg={7}>
            <div>
            <SearchBar />
            </div>
          </Col>
          <Col xs={4} md={3} lg={2}>
              <button className="btn btn-primary" onClick={()=> showStore()}>Add New Store</button>
          </Col>
        </Row>

        <Table bordered striped className="table table-rounded">
          <thead>
            <tr className="table-dark">
              <th>Store Name</th>
              <th>Location</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.storeId}>
                <td>{store.storeName}</td>
                <td>{store.storeLocation}</td>
                <td>{store.storeAddress}</td>
                <td className="text-center">
                  <Link
                    to={`/store/${store.storeId}`}
                    className="btn btn-success m-1"
                  >
                    <FaEye />
                  </Link>
                  <button className="btn btn-warning m-1" onClick={() => showStore(store)}>
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => showDeleteConfirmation(store.storeId)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          confirmDelete={() => deleteStore(storeToDelete)}
        />
      )}
      {showStoreForm && (
        <StoreForm
          show={showStore}
          setShow={setShowStoreForm}
          storeData={storeToUpdate}
          onSubmit={saveUpdateStore}
        />
      )}
    </section>
  );
};

export default StoreTable;
