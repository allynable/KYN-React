import axios from 'axios'
const STORE_API_URL = "http://localhost:8080/online/"
class StoreService{
    viewStore(){
        return axios.get(STORE_API_URL + "stores");
    }

    getStoreById(storeId){
        return axios.get(STORE_API_URL + "store/" + storeId);
    }

    deleteStore(storeId){
        return axios.delete(STORE_API_URL + "store/" + storeId);
    }

    saveStore(store){
        return axios.post(STORE_API_URL + "store", store);
    }

    updateStore(store){
        return axios.put(STORE_API_URL + "store/" + store.storeId, store);
    }

    searchStore(keyword){
        return axios.get(STORE_API_URL + "stores/"+ keyword);
    }
}

const storeService = new StoreService()
export default storeService