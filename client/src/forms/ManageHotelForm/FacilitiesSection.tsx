import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForms"

const FacilitiesSection = () => {
    const { register,
        formState: {
            errors,
        }
    } = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">
                Facilities
            </h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((facility) => (
                    <label className="cursor-pointer text-sm gap-1 flex items-center text-gray-700">
                        <input type="checkbox" value={facility}
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true;
                                    } else {
                                        return "Atleast one facility is required"
                                    }
                                }
                            })} />

                        {facility}

                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
            )}
        </div>
    )
}

export default FacilitiesSection
