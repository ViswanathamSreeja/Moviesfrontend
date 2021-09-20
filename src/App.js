import React, { useEffect } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popular from './pages/Popular';
import Latest from './pages/Latest';
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Header from './components/Header';
import SignupComplete from './pages/auth/SignupComplete';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
export const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {


      if (user) {

        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)           //calling func
          .then(res => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,


              }
            });
          })
          .catch(e => console.log("err", e.message))

      }
    })
    return () => unsubscribe()
  }, [dispatch])
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signup/complete" component={SignupComplete} />
        <Route exact path="/popular" component={Popular} />
        <Route exact path="/latest" component={Latest} />

      </Switch>
    </>
  )
}


export default App;
