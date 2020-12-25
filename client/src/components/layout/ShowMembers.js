import UserCard from "./userCard";
import "./styles/showMembers.css";
import { Fragment } from "react";

const ShowMembers = ({ members, saved }) => {
  return (
    <div className="showMember__card__container">
      {saved
        ? members?.map((member) => (
            <UserCard key={member._id} data={member} saved />
          ))
        : members?.map((member, index) => (
            <UserCard data={member} index={index} />
          ))}
    </div>
  );
};

export default ShowMembers;
