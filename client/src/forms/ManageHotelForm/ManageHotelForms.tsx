import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    onSave: (hotelFormData: FormData) => void
    isLoading: boolean
}

const ManageHotelForms = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formdataJson: HotelFormData) => {
        const formdata = new FormData();
        formdata.append("name", formdataJson.name);
        formdata.append("city", formdataJson.city);
        formdata.append("country", formdataJson.country);
        formdata.append("description", formdataJson.description);
        formdata.append("type", formdataJson.type);
        formdata.append("pricePerNight", formdataJson.pricePerNight.toString());
        formdata.append("starRating", formdataJson.starRating.toString());
        formdata.append("adultCount", formdataJson.adultCount.toString());
        formdata.append("childCount", formdataJson.childCount.toString());

        formdataJson.facilities.forEach((facility, index) => {
            formdata.append(`facilities[${index}]`, facility)
        })

        Array.from(formdataJson.imageFiles).forEach((imageFile) => {
            formdata.append(`imageFiles`, imageFile);
        });

        onSave(formdata)

    })
    return (
        <FormProvider {...formMethods}>
            <form action="" className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-600 text-white p-2 font-bold 
                    hover:bg-blue-500 hover:text-xl
                    disabled:bg-gray-500
                    "

                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>

    )
}

export default ManageHotelForms
