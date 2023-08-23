import { Friend } from "../../api/endpoints/friends";

export default function SentRequestsTap({
  friendRequestsSent,
}: {
  friendRequestsSent: Friend[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {friendRequestsSent.map((friend) => (
        <div key={friend.id} className="flex justify-between items-center pr-5 border-b border-gray-200 py-3">
          <div className=" flex gap-5">
            <img
              className="rounded-full w-10 h-10"
              src={friend.avatar}
              alt=""
            />
            <div>
              <h5 className="font-semibold capitalize text-sm">
                {friend.fullName}
              </h5>
              <span className="text-xs font-semibold text-gray-500">
                {friend.occupation}
              </span>
            </div>
          </div>
          <button className=" bg-red-100 hover:opacity-75 text-red-500 rounded-lg px-3 py-1 font-semibold text-xs ">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
