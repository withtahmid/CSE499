import { useAppSelector } from "../store"
import { MdAutorenew } from "react-icons/md";
import RadialProgress from "./small-components/RadialProgress";
import ChatBotImage from '../../src/assets/images/Chatbot.png'
const ChatTop = () => {

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
                {/* <RadialProgress /> */}
                <a className="btn btn-ghost text-xl">BondhuBot</a>
            </div>
            <div className="navbar-center">
                <div className="p-2 items">
                    {/* <RadialProgress /> */}
                </div>
            </div>
            <div className="navbar-end">
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
                        {/* <li><label htmlFor="dbd6f2a8-7523-11ef-a8dd-efafc29dbcb6" className="flex justify-between">Dark Mode <input id="dbd6f2a8-7523-11ef-a8dd-efafc29dbcb6" type="checkbox" className="toggle toggle-xs" defaultChecked /></label></li>
                        <li><label className="flex justify-between">About</label></li> */}
                    </ul>
                </div>

            </div>
        </div>
    );



}

export default ChatTop;