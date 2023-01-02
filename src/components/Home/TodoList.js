import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [allTodos, setAllTodos] = useState([])
    useEffect(() => {
        fetch("https://todos-server-iota.vercel.app/todos")
            .then(res => res.json())
            .then(data => setAllTodos(data))
    }, [])

    const handleMakeComplete = id => {
        fetch(`https://todos-server-iota.vercel.app/todos/${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make Verified successful.')
                    window.location.reload()
                }
            })
    }

    const handleDeleteTodo = id => {
        const proceed = window.confirm('Are you Sure?');
        if (proceed) {
            fetch(`https://todos-server-iota.vercel.app/todos/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast('Deleted successfully');
                        const remaining = todos.filter(odr => odr._id !== id);
                        setTodos(remaining);
                        window.location.reload()
                    }
                })
        }
    }

    return (
        <div className='lg:pr-20 lg:pl-20 ml-3 mr-3'>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Todos</th>
                            <th>Date</th>
                            <th>Complete</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allTodos.map((allTodo, i) => <tr key={allTodo._id}>

                                {
                                    allTodo.status ?
                                        <>
                                            <th className='line-through'>{i + 1}</th>
                                            <td className='line-through'>{allTodo.name}</td>
                                            <td className='line-through'>{allTodo.date}</td>
                                        </>
                                        :
                                        <>
                                            <th>{i + 1}</th>
                                            <td>{allTodo.name}</td>
                                            <td>{allTodo.date}</td>
                                        </>
                                }

                                {
                                    allTodo.status ?
                                        <>
                                            <td ><img className='w-10' src="https://i.ibb.co/1qFSWxn/tik-removebg-preview.png" alt="" /></td>
                                        </>
                                        :
                                        <>
                                            <td><button onClick={() => handleMakeComplete(allTodo._id)} className='btn btn-xs btn-primary'>No</button></td>
                                        </>
                                }
                                <td><Link to={allTodo._id}><button className='btn btn-xs btn-danger'>Edit</button></Link></td>
                                <td><button onClick={() => handleDeleteTodo(allTodo._id)} className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodoList;