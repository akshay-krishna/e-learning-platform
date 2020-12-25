import UserCard from "./userCard";
import "./styles/showMembers.css";

const ShowMembers = ({ members }) => {
  return (
    <div className="showMember__card__container">
      {members?.map((member) => (
        <UserCard key={member._id} data={member} />
      ))}
    </div>
  );
};

export default ShowMembers;
