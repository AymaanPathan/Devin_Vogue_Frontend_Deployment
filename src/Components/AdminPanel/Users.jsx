import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal/Modal";
import UsernameModal from "./Modal/UsernameModal";
import Sidebar from "./Sidebar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/AllUsers",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (err) {
      toast.error("Error fetching users");
      console.error(err);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      toast.loading("Deleting user...");
      const response = await fetch(
        "https://devin-vogue-backend-deployment-2.onrender.com/deleteUser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      toast.dismiss();
      if (response.ok) {
        toast.success(data.Message);
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        toast.error(data.Message);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error deleting user");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="py-8 flex-1 overflow-y-auto">
        {" "}
        {/* Added overflow-y-auto to handle content overflow */}
        <h2 className="text-3xl font-semibold mb-8 text-center text-indigo-600">
          Users
        </h2>
        <div className="my-2 flex sm:flex-row flex-col items-center">
          <div className="block relative mb-4 sm:mb-0 sm:mr-4 w-full sm:w-1/3">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search"
              className="appearance-none rounded-md border border-gray-400 block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="text-sm">
                    <td className="px-3 py-2 border-b border-gray-200 bg-white">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 bg-white">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 bg-white">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.role}
                      </p>
                    </td>
                    <td className="px-3 border-b border-gray-200 bg-white">
                      <div className="flex gap-1 items-center justify-between">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="text-indigo-600 hover:text-indigo-900 text-xs"
                        >
                          Change Email
                        </button>
                        <button
                          onClick={() => setIsUsernameModalOpen(true)}
                          className="text-indigo-600 hover:text-indigo-900 text-xs"
                        >
                          Change Username
                        </button>
                        <button
                          onClick={() => handleUserDelete(user._id)}
                          className="text-white bg-red-700 p-1 rounded-md text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
      {isUsernameModalOpen && (
        <UsernameModal closeModal={() => setIsUsernameModalOpen(false)} />
      )}
    </div>
  );
}
