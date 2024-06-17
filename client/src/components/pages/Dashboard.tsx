import { Heroes } from "../_comp/Heroes"








export const Dashboard = () => {

    return (
        <div className=" flex justify-between items-center h-screen">
            <div className="w-90  flex    ">
            <Heroes />
            <Heroes />
            <Heroes />
            <Heroes />
            <Heroes />
            <Heroes />
            <Heroes />

            </div>
        </div>
    )
}