import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import {useAuthContext} from "../context/useAuthContext";
import useCreateWorkout from "../hooks/useCreateWorkout";
import useDelete from "../hooks/useDelete";

function Home(props) {
    const {authUser} = useAuthContext()
    const [workoutData,setWorkoutData] = useState({
        title:'',
        duration:'',
        callories:''
    })

    const handleSelect = (ev) => {
           if (ev.target.name === 'title'){
               setWorkoutData((prev) => ({...prev, [ev.target.name]: ev.target.value}))
           }else{
               setWorkoutData((prev) => ({...prev, [ev.target.name]: ev.target.value}))
           }
    }

    const {createWorkout,loading,error} = useCreateWorkout()
    const handleCreate =async (ev) => {
        ev.preventDefault()
        await createWorkout(workoutData)
    }
    const {deletej} = useDelete();
    const handleDelete = async (id) => {
        await deletej(id)
    }

    return (
        <div>
           <Navbar />
            <div className={'w-full h-fit min-h-[100vh] bg-white text-gray-500 px-5 pt-4'}>
                <h2  className={'text-black text-xl'}>Workouts</h2>
                <section className={'w-full h-fit  flex items-start justify-between '}>
                    <div className={'w-[65%] flex flex-col items-start justify-start '}>
                        {authUser.workouts.map((workout) => (
                            <div
                                className={'w-full h-20 bg-amber-100 mt-5 rounded-lg flex flex-col items-center justify-center relative'}>
                                <section className={'w-full h-[45%] flex items-center justify-around '}>
                                    <h2 className={'m-0 w-[30%] h-[100%] flex items-center justify-center'}>Title</h2>
                                    <p className={'w-[30%] h-[100%] flex items-center justify-center'}>Duration</p>
                                    <p className={'w-[30%] h-[100%] flex items-center justify-center'}>Callories</p>
                                </section>
                                <section className={'w-full h-[45%] flex items-center justify-around '}>
                                    <h2 className={'m-0 w-[30%] h-[100%] flex items-center justify-center'}>{workout.title}</h2>
                                    <p className={'w-[30%] h-[100%] flex items-center justify-center'}>{workout.duration}</p>
                                    <p className={'w-[30%] h-[100%] flex items-center justify-center'}>{workout.callories}</p>
                                </section>
                                <button onClick={() => handleDelete(workout.id)} className={'btn bg-red-500 border-0 absolute right-6'}>Delete</button>

                            </div>

                        ))}
                    </div>

                    <div className={'w-[30%] h-fit px-3 py-2 bg-amber-100 rounded-lg mt-5'}>
                        <h1>Create New Workout</h1>
                        <form onSubmit={handleCreate}>
                            <input type={'text'} name={'title'} className={'w-full h-10 mt-2 bg-white rounded-sm pl-2'} value={workoutData.title} placeholder={'Title'} onChange={handleSelect}/>
                            <input type={'text'} name={'duration'} className={'w-full h-10 mt-2 bg-white rounded-sm pl-2'} value={workoutData.duration} placeholder={'Duration'} onChange={handleSelect}/>
                            <input type={'text'} name={'callories'} className={'w-full h-10 mt-2 bg-white rounded-sm pl-2'} value={workoutData.callories} placeholder={'Callories'} onChange={handleSelect}/>
                            {error && <div className={'w-full p-2 border-red-500 border-[1px] text-red-500 flex items-center justify-center rounded-lg mt-4'}>
                                {error}
                            </div>}
                           <br/> <button className={'btn mt-5 '}>
                            {!loading ? "Create Workout" : <span className={'loading loading-md'}></span>}
                        </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;