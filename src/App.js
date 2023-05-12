import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { getCurrentUser } from "./service/OnlineService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import StoreTable from "./component/StoreTable";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Store from "./component/Store";
import PrivateRoute from "./component/ProtectedRoute";
import PageNotFound from "./component/PageNotFound";
import Profile from "./component/Profile";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
export const ACCESS_TOKEN = 'accessToken';

function App() {
  const [authenticated, setAuthenticated] = useState();
  const [currentUser, setCurrentUser] = useState(null);


  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
    .then(response => {
      setCurrentUser(response);
      setAuthenticated(true);
    }).catch(error => {
    });    
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    toast.success("You're safely logged out!");
  }

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  return (
    <div className="App">

      <Router>
        <Header 
          authenticated={authenticated}
          onLogout={handleLogout}
        />
        
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/stores'  element={<StoreTable authenticated={authenticated}/>} />
            <Route path='/store/:storeId' element={<Store />}></Route>
            <Route path='stores/:keyword' element={<StoreTable authenticated={authenticated}/>} />
            <Route path='/login' element={<Login authenticated={authenticated} />}/>
            <Route path="/register" element={<Register authenticated={authenticated} />} />
            <Route path="/profile" element={<PrivateRoute authenticated={authenticated}> <Profile authenticated={authenticated} currentUser={currentUser}/></PrivateRoute>} />
            <Route path="/oauth2/redirect" element={ <OAuth2RedirectHandler/>} />
            <Route path='*' element={<PageNotFound/>} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer autoclose={2500} theme="dark" limit={3} className="toast-position"/>
     
    </div>
  );
}

export default App;