import { MdAutorenew } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { clearConversation } from "../store/conversatioSlice";
import { useAppDispatch, useAppSelector } from "../store";
// import { reset } from "../store/metadataSlice";
import DarkModeBtn from "./small-components/DarkModeBtn";
import ChatBotImage from '../../src/assets/images/Chatbot.png'
const Navbar = () => {
    const _id = useAppSelector(state => state.conversation._id)
    const resetConversation = () => {
        const modal = document.getElementById('new-conversation-modal') as HTMLDialogElement
        if (modal && _id) {
            modal.showModal()
        }
    }

    return (
        <div className="navbar bg-base-100 z-10">
            <div className="navbar-start">
                <div className="avatar online p-1 cursor-pointer">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                        <img src={ChatBotImage} />
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">BondhuBot</a>
            </div>
            <div className="navbar-end">

                {/* <button   onClick={resetConversation}
                className="btn btn-ghost btn-circle bg-transparent text-2xl"> <SlOptionsVertical/></button> */}
                {/* <button disabled={!_id} className="btn btn-primary btn-circle text-2xl"
                    onClick={resetConversation}
                >
                    <MdAutorenew/>
                </button> */}
                {/* <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
                </button> */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="left-[-10] menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><label className="flex justify-between" onClick={resetConversation}>New Conversation <MdAutorenew className="text-lg" /></label></li>
                        <li><label htmlFor="dbd6f2a8-7523-11ef-a8dd-efafc29dbcb6" className="flex justify-between">Dark Mode <input id="dbd6f2a8-7523-11ef-a8dd-efafc29dbcb6" type="checkbox" className="toggle toggle-xs" defaultChecked /></label></li>
                        <li><label className="flex justify-between">About</label></li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Navbar;