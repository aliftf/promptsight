import PromptCard from "./PromptCard";

const Profile = ({ name, desc, posts, handleEdit, handleDelete }) => {
  return (
    <div className="w-full">
      <h1 className="title-text text-left">{name} Profile</h1>
      <p className="description-text text-left">{desc}</p>
      <div className="mt-10 prompt-layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
