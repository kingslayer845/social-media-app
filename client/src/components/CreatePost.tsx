import { useQuery } from "react-query";
import { getUser } from "../api/endpoints/auth";
import { UserData } from "./UserInfo";
import { BiImageAdd } from "react-icons/bi";
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
    formData.append("message", message); // Replace with the actual message
    postQuery.mutate(formData);
  };
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className=" flex items-center gap-3">
<img className="w-10 h-10 rounded-full" src={userQuery.data?.avatar} alt="" />
      <textarea
        onChange={({ target }) => setMessage(target.value)}
        value={message}
        className="bg-gray-200 rounded-xl px-3 py-1 resize-none w-full"
        placeholder="What is in your mind"
        />
        </div>
      <div className="flex justify-evenly items-center mt-3">
        <label className="text-gray-500 flex items-center gap-1 bg-gray-200 rounded-xl p-2 cursor-pointer">
          <BiImageAdd />
          <span>Upload image</span>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
        <button
          className="text-white bg-blue-400 px-4 py-1 rounded-md font-semibold"
          onClick={(event) => handleUpload(event)}
        >
          Post
        </button>
      </div>
    </div>
  );
}
