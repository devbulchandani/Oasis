import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded-4 p-4 flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles: FileList) => {
                            if (imageFiles.length === 0) {
                                return "At least one image should be added";
                            }
                        
                            if (imageFiles.length > 6) {
                                return "Total number of images cannot be more than 6";
                            }
                        
                            return true;
                        },
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;
