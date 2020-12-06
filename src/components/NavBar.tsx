export const NavBar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="lg:flex-grow text-center lg:text-left">
                    <h1 className="text-3xl">Sounds</h1>
                </div>
                <div className="text-sm lg:flex-grow text-center lg:text-right">
                    <NavButton id="home-button" title="Home"/>
                    <NavButton id="load-button" title="Load"/>
                    <NavButton id="settings-button" title="Settings"/>
                    <NavButton id="about-button" title="About"/>
                </div>
            </div>
        </nav>
    );
}

interface NavButtonProps {
    id: string;
    title: string;
}

function NavButton({id, title}: NavButtonProps){
    return (
        <a id={id} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
            {title}
        </a>
    );
}