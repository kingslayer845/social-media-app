import { useQuery } from "react-query";
import { getUser } from "../api/endpoints/auth";
import { UserData } from "./UserInfo";
import { useState } from "react";
import useCreatePost from "../hooks/useCreatePost";
export default function CreatePost() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };
  const postQuery = useCreatePost();
  const userQuery = useQuery<UserData>("myProfile", () => getUser("myProfile"));
  const handleUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("message", message);
    postQuery.mutate(formData, {
      onSuccess: () => {
        setSelectedFile(null);
        setMessage("");
      },
    });
  };
  return (
    <div className="bg-white p-5 rounded-lg dark:bg-dark-400">
      <div className=" flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full"
          src={userQuery.data?.avatar}
          alt=""
        />
        <textarea
          onChange={({ target }) => setMessage(target.value)}
          value={message}
          className="bg-gray-200 rounded-xl px-3 py-1 resize-none w-full dark:bg-dark-200"
          placeholder="What is in your mind"
        />
      </div>
      <div className="flex justify-evenly items-center gap-2 mt-3">
        <input
          className="block w-full h-full px-1 py-1  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-dark-200 dark:border-transparent"
          type="file"
          onChange={handleFileChange}
        />

        <button
          className={`text-white  px-4 py-1 rounded-md font-semibold whitespace-nowrap ${
            selectedFile ? "bg-blue-700" : "bg-blue-200 dark:bg-white dark:text-dark-100"
          }`}
          onClick={(event) => handleUpload(event)}
          disabled={!selectedFile}
        >
          {selectedFile? "Post":"no post"}
        </button>
      </div>
    </div>
  );
}
