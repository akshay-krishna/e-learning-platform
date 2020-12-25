import UserCard from "./userCard";
import "./styles/showMembers.css";
const ShowMembers = ({ members }) => {
  return (
    <div className="showMember__card__container">
      {members?.map((member, index) => (
        <UserCard key={index} user={member} />
      ))}
    </div>
  );
};

export default ShowMembers;
