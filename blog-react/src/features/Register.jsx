import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:''
    });

    const handleChange = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })

    }

    const handleSubmit = async (e) =>{

        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/api/register', user,{
                headers:{
                    "Content-Type":"application/json"
                }
            });

            localStorage.setItem('auth_token',response.token);
            navigate('/create_post');
            console.log('response', response);

        }catch(error){
            console.log('error', error);
            
        }
    }

    return (
      <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900">Register</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6">

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      placeholder="janesmith"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      onChange={handleChange}
                      placeholder="janesmith@gmail.com"
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                  </label>
                  <div className="mt-1">
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      onChange={handleChange}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

              </div>
            </div>
  
            <div className="flex justify-end gap-x-4">
              <button
                type="button"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
    );
  }