import { ClipLoader } from "react-spinners";

export default function Loading(){

    return(
        <>
        <div className="flex justify-center items-center mt-52">
            <ClipLoader
                    color={'#FB923C'}
                    size={200}
                />
        </div>
            
        </>
    )
}