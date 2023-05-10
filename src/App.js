import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import StoreTable from "./component/StoreTable";
import Home from "./component/Home";
import Login from "./component/Login";
import Store from "./component/Store";
import PageNotFound from "./component/PageNotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/stores'  element={<StoreTable />}></Route>
            <Route path='/store/:storeId' element={<Store />}></Route>
            <Route path='stores/:keyword' element={<StoreTable />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
        <Footer />
      </Router>

     
    </div>
  );
}

export default App;
