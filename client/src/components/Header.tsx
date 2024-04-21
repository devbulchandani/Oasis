import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContexts";
import SignOutButton from "./SignOutButton";


const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-blue-800 py-6 ">
            {/* Header Container  */}
            <div className="
                container mx-auto 
                flex justify-between">
                {/* Logo Span  */}
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">
                        DevBooking
                    </Link>
                </span>

                {/* Sign In Span Button */}
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link className="flex items-center 
                                text-white px-3 
                                font-bold hover:bg-blue-600"
                                to="/my-bookings">
                                My Bookings
                            </Link>

                            <Link className="flex items-center 
                                text-white px-3 
                                font-bold hover:bg-blue-600"
                                to="/my-hotels">
                                My Hotels
                            </Link>

                            <SignOutButton />
                        </>
                    ) : (
                        <Link to="/sign-in"
                            className="flex items-center text-blue-600 px-3 font-bold
                                bg-white
                                hover:bg-gray-100 hover:text-green-500
                        ">
                            Sign In
                        </Link>
                    )}

                </span>
            </div>
        </div>
    )
}

export default Header