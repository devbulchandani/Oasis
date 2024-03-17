import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client.ts"
import { CiLocationOn } from "react-icons/ci"
import { RiHotelFill } from "react-icons/ri"
import { IoIosPricetags, IoIosStar } from "react-icons/io"

const MyHotels = () => {
    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {

        }
    })

    if (!hotelData) {
        return <span className="">No Hotels Found</span>
    }
    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">
                    My Hotels
                </h1>
                <Link to="/add-hotel"
                    className="flex bg-blue-600 text-white text-xl 
                    font-bold p-2 hover:bg-blue-500">
                    Add Hotel
                </Link>
            </span>

            <div className="grid grid-cols-1 gap-8">
                {hotelData.map((hotel) => (
                    <div className="flex flex-col justify-between border
                        border-slate-300 rounded-lg p-8 gap-5">
                        <h2 className="text-2xl font-bold">
                            {hotel.name}
                        </h2>
                        <div className="whitespace-pre-line overflow-auto">
                            <p style={{ overflowWrap: 'break-word' }}>{hotel.description}</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <CiLocationOn className="mr-1" />
                                {hotel.city},
                                {hotel.country}
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <RiHotelFill className="mr-1" />
                                {hotel.type}
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <IoIosPricetags className="mr-1" />
                                ₹{hotel.pricePerNight} per night
                            </div>

                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <IoIosStar className="mr-1" />
                                {hotel.starRating} Star Rating
                            </div>

                        </div>

                        <span className="flex justify-end">
                            <Link to={`/edit-hotel/${hotel._id}`}
                                className="flex bg-blue-600 text-white text-xl 
                            font-bold p-2 hover:bg-blue-500"
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels
