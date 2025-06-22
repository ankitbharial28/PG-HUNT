import './App.css'
import Home from './assets/Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './assets/Components/About'
import Contactt from './assets/Components/Contactt'
import Layout from './assets/Components/layouts/Layout'
import SignUp from './assets/Components/SignUp'
import Login from './assets/Components/Login'
import AdminDashboard from './assets/Components/AdminDashboard'
import UserDashboard from './assets/Components/UserDashborad'
import OwnerDashboard from './assets/Components/OwnerDashboard'
import CreatePg from './assets/Components/CreatePg'
import ManagePg from './assets/Components/ManagePg'
import BookPg from './assets/Components/BookPg'
import GetAllPg from './assets/Components/GetAllPg' 
import ReviewPg from './assets/Components/reviewPg'
import Complaint from './assets/Components/Complaint'
import ForgetPassword from './assets/Components/ForgetPassword'
import ResetWithOtp from './assets/Components/ResetWithOtp'
import ApprovePg from './assets/Components/ApprovePg'
import ResolveComplaint from './assets/Components/ResolveComplaint'
import ViewPg from './assets/Components/ViewPg'
import ViewOwner from "./assets/Components/ViewOwner"
import ViewReview from './assets/Components/ViewReview'
function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/About'} element={<About />} />
            <Route path={'/Contactt'} element={<Contactt />} />
        

          </Route>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/admin/dashboard'} element={<AdminDashboard />} />
          <Route path={'/User/dashboard'} element={<UserDashboard />} />
          <Route path={'/Owner/dashboard'} element={<OwnerDashboard />} />
          <Route path={'/owner/CreatePg'} element={<CreatePg />} />
          <Route path='/owner/managePg' element={<ManagePg />} />
          <Route path='/user/BookPg' element={<BookPg />} />
          <Route path='/user/getAllPg' element={<GetAllPg />} />
          <Route path='/user/reviewPg' element={<ReviewPg />} />
          <Route path='/user/complaint' element={<Complaint />} />
          <Route path='/resetpassword' element={<ResetWithOtp />} />
          <Route path='/ForgetPassword' element={<ForgetPassword />} />
          <Route path='/admin/approvePg' element={<ApprovePg />} />
          <Route path='/admin/resolveComplaint' element={<ResolveComplaint />} />
          <Route path='/view/pg' element={<ViewPg/>} />
           {/* <Route path='/view/owner/:pgId' element={<ViewOwner/>} /> */}
           <Route path='/view/review' element={<ViewReview/>} />
        </Routes>
      </BrowserRouter>




    </>
  )
}

export default App
