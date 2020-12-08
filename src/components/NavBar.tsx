import {Link} from "react-router-dom";

export const NavBar = (): JSX.Element => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="lg:flex-grow text-center lg:text-left">
                    <h1 className="text-3xl">Sounds</h1>
                </div>
                <div className="text-sm lg:flex-grow text-center lg:text-right">
                    <NavButton to="/" id="home-button" title="Home"/>
                    <NavButton to="/load" id="load-button" title="Load"/>
                    <NavButton to="/settings" id="settings-button" title="Settings"/>
                    <NavButton to="/about" id="about-button" title="About"/>
                </div>
            </div>
        </nav>
    );
}

interface NavButtonProps {
    id: string;
    title: string;
    to: string;
}

const NavButton = ({id, title, to}: NavButtonProps): JSX.Element => {
    return (
        <Link to={to} id={id} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
            {title}
        </Link>
    );
}