import './App.css';
import Blog from "./components/Blog";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {init} from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init.request());
  },[dispatch, init.request])

  return (
    <Blog/>
  );
}

export default App;
