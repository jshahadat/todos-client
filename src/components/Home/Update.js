import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const Update = () => {

    const storedTodo = useLoaderData();

    const [todo, setTodo] = useState(storedTodo);


    const handleUpdateTodo = event => {
        event.preventDefault();
        fetch(`https://todos-server-iota.vercel.app/${storedTodo._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast('Todo Updated')
                }
            })
    }

    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newTodo = { ...todo }
        newTodo[field] = value;
        setTodo(newTodo);
    }


    return (
        <div className='flex justify-center'>

            <div className="relative w-full max-w-lg mb-12 mt-12" >
                <div className="absolute lg:top-0 top-0 lg:left-2 left-1 lg:w-72 w-72 lg:h-72 h-60  bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" ></div >
                <div className="absolute lg:top-0 lg:left-72 left-32 w-72  lg:h-72 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" ></div >
                <div className="absolute lg:-bottom-8 lg:left-40 top-56 left-20 w-72 lg:h-72 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" ></div >
                <div className="relative space-y-2" >
                    <div>
                        <form onSubmit={handleUpdateTodo}>
                            <section className="flex lg:mr-10 lg:ml-10 justify-center">
                                <div className=" flex rounded-2xl shadow-lg  lg:w-fit w-96 p-5 items-center">
                                    <div className='flex justify-center'>
                                        <div className="">
                                            <h2 className="font-bold text-2xl text-[#002D74] mb-4">Update Todo</h2>
                                            <div>
                                                <div className=' pb-6 lg:mr-6'>
                                                    <input className="p-2 lg:w-64  w-80  rounded-xl border" onChange={handleInputChange} defaultValue={storedTodo.name} type="text" name="name"
                                                        placeholder="Add a todo" required />
                                                </div>
                                                <div className=' pb-6 lg:mr-6'>
                                                    <input className="p-2 lg:w-64  w-80  rounded-xl border" onChange={handleInputChange} defaultValue={storedTodo.date} type="date" name="date"
                                                        placeholder="Add Date" required />
                                                </div>
                                            </div>
                                            <div className="mb-4 relative w-28 h-12 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                                                <div className=' w-28 h-28  bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute'>
                                                    <input className='w-28 h-28 btn btn-outline bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute' type="submit" value="Update todo" />
                                                </div>
                                                <div>
                                                </div>
                                            </div >
                                        </div >

                                    </div >
                                </div >

                            </section >
                        </form >
                    </div >
                </div >
                <Toaster />
            </div >
        </div>
    );
};

export default Update;