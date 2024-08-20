import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Login() {
  const { onSubmit } = useContext(AppContext);

  return (
    <div className="w-screen h-screen bg-slate-300 fixed inset-0 flex items-center justify-center">
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
        action=""
        className="bg-white p-6 rounded shadow-md"
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          placeholder="example@example.com"
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
