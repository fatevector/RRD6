import {
    Navigate,
    NavLink,
    Outlet,
    useParams,
    useRoutes
} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <NavLink to="/users">Users List Page</NavLink>
            <h1>Home Page</h1>
        </div>
    );
};

const UserProfilePage = () => {
    const { userId } = useParams();
    return (
        <div>
            <NavLink to="/users">Users List Page</NavLink>
            {"   |   "}
            <NavLink to={`/users/${userId}/edit`}>User Editing Page</NavLink>
            <h1>User Profile Page</h1>
            <h3>User ID: {userId}</h3>
        </div>
    );
};

const UserEditingPage = () => {
    const { userId } = useParams();
    return (
        <div>
            <NavLink to="/users">Users List Page</NavLink>
            {"   |   "}
            <NavLink to={`/users/${userId}/profile`}>User Profile Page</NavLink>
            {"   |   "}
            <NavLink to={`/users/${Number(userId) + 1}/profile`}>
                Another User Page
            </NavLink>
            <h1>User Editing Page</h1>
        </div>
    );
};

const UsersListPage = () => {
    const users = [0, 1, 2, 3, 4];
    return (
        <div>
            <NavLink to="/">Home Page</NavLink>
            <h1>Users List Page</h1>
            <ul>
                {users.map(el => (
                    <li key={el}>
                        <NavLink to={"/users/" + el + "/profile"}>
                            User {el}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

function App() {
    const elements = useRoutes([
        {
            path: "",
            element: <HomePage />
        },
        {
            path: "users",
            element: <Outlet />,
            children: [
                {
                    path: "",
                    element: <UsersListPage />
                },
                {
                    path: ":userId",
                    element: <Outlet />,
                    children: [
                        {
                            path: "profile",
                            element: <UserProfilePage />
                        },
                        {
                            path: "edit",
                            element: <UserEditingPage />
                        },
                        {
                            path: "",
                            element: <Navigate to="profile" />
                        },
                        {
                            path: "*",
                            element: <Navigate to="../profile" />
                        }
                    ]
                }
            ]
        },
        {
            path: "*",
            element: <Navigate to="/" />
        }
    ]);
    return <div className="App">{elements}</div>;
}

export default App;
