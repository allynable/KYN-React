import React, { useState, useEffect } from "react";
import StoreService from "../service/StoreService";
import {
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "./Modal/DeleteModal";
import StoreForm from "./Modal/StoreForm";
import storeService from "../service/StoreService";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";

const StoreTable = (props) => {
  const { keyword } = useParams();
  const [stores, setStores] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeToUpdate, setStoreToUpdate] = useState(null);

  const storeData = () => {
    if (keyword) {
      StoreService.searchStore(keyword).then((response) => {
        setStores(response.data);
      });
    } else {
      StoreService.viewStore().then((response) => {
        setStores(response.data);
      });
    }
  };
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
      toast.error("Store deleted successfully!");
    });
  };

  const showStore = (store) => {
    if (store) {
      setStoreToUpdate(store);
    } else {
      setStoreToUpdate(null);
    }
    setShowStoreForm(true);
  };

  const saveUpdateStore = (store) => {
    if (store.storeId) {
      storeService.updateStore(store).then(() => {
        storeService.viewStore().then((response) => {
          setStores(response.data);
          toast.info("Store updated Successfully!");
        });
      });
    } else {
      storeService.saveStore(store).then(() => {
        storeService.viewStore().then((response) => {
          setStores(response.data);
          toast.success("Store added successfully!");
        });
      });
    }
  };

  return (
    <section>
      <Container>
        <Row className="py-5 align-items-center">
          <Col xs={12} md={4} lg={3}>
            <h1>Stores</h1>
          </Col>
          <Col xs={8} md={5} lg={7}>
            <div>
              <SearchBar />
            </div>
          </Col>
          {props.authenticated && (
            <Col xs={4} md={3} lg={2}>
              <button className="btn btn-primary" onClick={() => showStore()}>
                Add New Store
              </button>
            </Col>
          )}
        </Row>

        <Table bordered striped className="table table-rounded">
          <thead>
            <tr className="table-dark">
              <th>Store Name</th>
              <th>Location</th>
              <th>Address</th>
              {props.authenticated && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.storeId}>
                <td>{store.storeName}</td>
                <td>{store.storeLocation}</td>
                <td>{store.storeAddress}</td>
                {props.authenticated && (
                  <td className="text-center">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-view-${store.storeId}`}>
                          View Store
                        </Tooltip>
                      }
                    >
                    <Link
                      to={`/store/${store.storeId}`}
                      className="btn btn-success m-1"
                    >
                      <FaEye />
                    </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-edit-${store.storeId}`}>
                          Update
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => showStore(store)}
                      >
                        <FaEdit />
                      </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-delete-${store.storeId}`}>
                          Delete
                        </Tooltip>
                      }
                    >
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => showDeleteConfirmation(store.storeId)}
                      >
                        <FaTrashAlt />
                      </button>
                    </OverlayTrigger>
                  </td>
                )}
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
