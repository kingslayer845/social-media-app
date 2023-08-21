import { Friend } from "../api/endpoints/friends";

export default ({ friend }: { friend: Friend }) => {
  return (
    <div className="flex gap-5 border-b border-gray-400 py-3">
      <img className="rounded-full w-10 h-10" src={friend.avatar} alt="" />
      <div>
        <h5 className="font-semibold capitalize text-sm">{friend.firstName}</h5>
      </div>
    </div>
  );
};
