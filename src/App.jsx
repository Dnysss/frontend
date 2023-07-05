import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NewProject from "./components/pages/new_project/NewProject";

import Home from "./components/pages/home/Home";
import SignIn from "./components/pages/signin/SignIn";
import SignUp from "./components/pages/signup/SignUp";
import Container from "./components/layout/container/Container";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Projects from "./components/pages/projects/Projects";
import Project from "./components/pages/project/Project";
import Profile from "./components/pages/user/Profile";
import Message from "./components/layout/message/Message";

import { UserProvider } from "./context/UserContext";

function App() {
    return (
        
        <Router>
            <UserProvider>
                <Navbar />
                {/* <Message /> */}
                <Container customClass="min_height">
                    <Routes>
                        <Route exact path="/" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/user/profile" element={<Profile />} />
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/projects" element={<Projects />}></Route>
                        <Route path="/newproject" element={<NewProject />}></Route>
                        <Route path="/project/:id" element={<Project />}></Route>
                    </Routes>
                </Container>
                <Footer />
            </UserProvider>
        </Router>
        
    );
}

export default App;
