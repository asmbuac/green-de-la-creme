import React, { useEffect, useState } from "react";
import "./blogs/static/Header.css";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import YardIcon from "@mui/icons-material/Yard";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Lottie from "lottie-react";
import plant from "./assets/images/plant.json";
import { useLogoutUserMutation } from './store/authApi';
import { useNavigate, Link } from 'react-router-dom';



export default function Header({ token }) {
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState('');

async function handleClick(e) {
  e.preventDefault();
  try {
    await logout();
    navigate('/login');
  } catch (error) {
    console.log(error);
  }
}



  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="navbar min-h-[32px] bg-[#f8f8f6]">
  <div className="flex-1">
    <a className="mx-auto lottie normal-case text-xl">
      <Link to="/blogs">
            <Lottie animationData={plant} className="w-20" />
          </Link>
    </a>
  </div>
      <div className="bg-[#f8f8f6] flex justify-center w-full top-0">
      <div className="flex flex-row justify-center items-center">

        <div className="header__icons flex basis-1/2 justify-center space-x-20">
          <Link to="/blogs">
            <HeaderOption className="mt-5" Icon={HomeIcon} title="Home" />
          </Link>
          <Link to="/resources">
            <HeaderOption Icon={YardIcon} title="Plant Info" />
          </Link>
          <Link to="/forum">
            <HeaderOption Icon={MapTwoToneIcon} title="Forum" />
          </Link>
          <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        </div>
        </div>
        </div>

    <div className="dropdown dropdown-end p-2">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://cdn-icons-png.flaticon.com/512/1010/1010298.png?w=1480&t=st=1679989297~exp=1679989[%E2%80%A6]e5f06a0c262d324e9c9cf24ba94b5d9a0bd9b9ffed7ff117cebef17" />
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content  p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><button className="button__input" id="logout" type="submit" onClick={handleClick}> Logout </button></li>
      </ul>
    </div>
  </div>
  );
}




    {/* // <div className="bg-[#f8f8f6] w-full pb-3 top-0">
    //   <div className="flex flex-row justify-center items-center">
    //     <div className="flex basis-1/4 start-0 mr__small">
    //       <Link to="/blogs">
    //         <Lottie animationData={plant} className="w-20" />
    //       </Link>
    //     </div>
    //     <div className="header__icons flex basis-1/2 justify-center space-x-20">
    //       <Link to="/blogs">
    //         <HeaderOption className="mt-5" Icon={HomeIcon} title="Home" />
    //       </Link>
    //       <Link to="/resources">
    //         <HeaderOption Icon={YardIcon} title="Plant Info" />
    //       </Link>
    //       <Link to="/forum">
    //         <HeaderOption Icon={MapTwoToneIcon} title="Forum" />
    //       </Link>
    //       <HeaderOption Icon={NotificationsIcon} title="Notifications" />
    //     <div className="flex basis-1/4 justify-end">
    //     <div className="sm:hidden flex">
    //       {toggle ? (
    //         <HeaderOption
    //           avatar="https://images.pexels.com/photos/8192014/pexels-photo-8192014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    //           title="Profile"
    //           onClick={() => setToggle(prevToggle => !prevToggle)}
    //         />
    //       ) : (
    //           <HeaderOption
    //           avatar="https://images.pexels.com/photos/8192014/pexels-photo-8192014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    //           title="Profile"
    //           onClick={() => setToggle(prevToggle => !prevToggle)}
    //         />
    //       )}
    //     </div>
    //       <div>
    //         <button className="button__input" id="logout" type="submit" onClick={handleClick}> Logout </button>
    //       </div>
    //     </div>
    //       <div className={`${!toggle ? 'hidden' : 'flex' }
    //       p-3 black-gradient absolute top-20 right-40 mx-4 my-2 min-w-[140px]
    //       z-10 rounded-xl`}>
    //         <ul className="list-none flex justify-end items-start flex-col gap-4">
    //         {navLinks.map((link) => (
    //             <li
    //           key={link.id}
    //           className="font-poppins text-white font-medium text-[16px] cursor-pointer"
    //           onClick={(e) => {
    //             setActive(link.id); // Update the setActive to link.id
    //             setToggle(false); // Close the dropdown menu
    //             handleClick(e); // Pass the event object to the handleClick function
    //           }}>
    //           {link.title}
    //         </li>
    //         ))}
    //     </ul>
    //       </div>
    //     </div>
    //     </div>
    //   </div> */}
