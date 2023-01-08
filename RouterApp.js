import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import LogIn from "./LogIn";
import SignUp from "./Signup";
import Detail from "./Detail";
import Exercise from "./Exercise";
import HomePage from "./HomePage";
import HomeAdmin from "./HomeAdmin";
import ExerciseAdmin from "./ExerciseAdmin";
import WatchedList from "./WatchedList";
const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/homeAdmin" element={<HomeAdmin />}></Route>
        <Route path="/exercisesAd/*" element={<ExerciseAdmin />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/exercises/*" element={<Exercise />}></Route>
        <Route path="/exercises/:id" element={<Detail />} />
        <Route path="/watchedlist" element={<WatchedList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

{
  /* <Route path="/exercises/E01" element={<Detail ExID="E01" />} />
        <Route path="/exercises/E02" element={<Detail ExID="E02" />} /> */
}
export default RouterApp;
