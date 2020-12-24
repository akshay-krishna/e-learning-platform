import UserCard from "./userCard";
import "./styles/showMembers.css";
const ShowMembers = ({ staffMembers }) => {
  return (
    <div className="showMember__card__container">
      {staffMembers.map((staff, index) => (
        <UserCard key={index} user={staff} />
      ))}
    </div>
  );
};

export default ShowMembers;
