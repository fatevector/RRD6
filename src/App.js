import {
    BrowserRouter,
    NavLink,
    Redirect,
    Route,
    Switch,
    useParams
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
                        <NavLink to={"/users/" + el}>User {el}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const UsersRouting = () => {
    return (
        <Switch>
            <Route path="/users/:userId/profile" component={UserProfilePage} />
            <Route path="/users/:userId/edit" component={UserEditingPage} />
            <Route path="/users" exact component={UsersListPage} />
            <Redirect from="/users/:userId" to="/users/:userId/profile" />
        </Switch>
    );
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/users" component={UsersRouting} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
