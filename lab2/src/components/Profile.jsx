function Profile({ name, role, avatarUrl }) {
  return (
    <div className="profile-card">
      <img src={avatarUrl} alt={`Avatar of ${name}`} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

export default Profile;