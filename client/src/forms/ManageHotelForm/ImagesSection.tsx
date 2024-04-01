import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";
import { MdOutlineDelete } from "react-icons/md";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext<HotelFormData>();

    const existingImgUrls = watch("imageUrls")

    const handleDelete = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, 
        imageUrl:string) => {
            event.preventDefault();
            setValue("imageUrls", existingImgUrls.filter((url) => url !== imageUrl))
    }

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded-4 p-4 flex flex-col gap-4">
                {existingImgUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImgUrls.map((url) => (
                            <div className="relative group">
                                <img src={url} alt="image" className="min-h-full object-cover" />
                                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white opacity-0 group-hover:opacity-100"
                                onClick={(event) => handleDelete(event, url)} 
                                ><MdOutlineDelete /></button>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles: FileList) => {

                            const totalLength = imageFiles.length + (existingImgUrls?.length || 0)
                            if (totalLength === 0) {
                                return "At least one image should be added";
                            }
                        
                            if (totalLength > 6) {
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
