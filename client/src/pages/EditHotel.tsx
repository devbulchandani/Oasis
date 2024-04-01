import { useParams } from "react-router-dom"
import * as apiClient from "../api-client.ts"
import { useMutation, useQuery } from "react-query";
import ManageHotelForms from "../forms/ManageHotelForm/ManageHotelForms.tsx";
import { useAppContext } from "../contexts/AppContexts.tsx";

const EditHotel = () => {
    const { showToast } = useAppContext();
    const { hotelId } = useParams();
    const { data: hotel } = useQuery("fetchMyHotelById", () => 
        apiClient.fetchMyHotelById(hotelId || ""), 
        {
            enabled: !!hotelId 
        }
    );

        const { mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
            onSuccess : () => {
                showToast({
                    message : "Hotel updated successfully",
                    type : "SUCCESS"
                })
            },
            onError : () => {
                showToast({
                    message : "Error updating Hotel",
                    type : "ERROR"
                })
            },
        });




    const handleSave = (hotelFormData : FormData) => {
        mutate(hotelFormData)
    }

    console.log("hId:", hotelId);
    console.log("h:", hotel);


    return (
        <ManageHotelForms hotel={hotel} onSave={handleSave} isLoading={isLoading} />
    );
};

export default EditHotel;

