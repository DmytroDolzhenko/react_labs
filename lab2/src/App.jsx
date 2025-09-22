import Profile from './components/Profile';
import './App.css';

const users = [
  {
    name: "Leanne Graham",
    role: "Manager",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    name: "Ervin Howell",
    role: "Developer",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705f"
  },
  {
    name: "Clementine Bauch",
    role: "Designer",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026706g"
  },
  {
    name: "Patricia Lebsack",
    role: "Product Owner",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026707h"
  },
  {
    name: "Chelsey Dietrich",
    role: "QA Engineer",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026708i"
  },
];

function App() {
  return (
    <div>
      <h1 className='main-title'>User Profiles</h1>
      <div className="profile-list">
        {users.map(user => (
          <Profile
            name={user.name}
            role={user.role}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;