export const AboutPanel = (): JSX.Element => {
    return (
        <div className="px-4 overflow-hidden min-h-screen">
            <h1 className="text-6xl text-center">About</h1>
            <ul className="mx-auto p-2">
                <li className="text-2xl">Sounds is a sound generation and track building application built using the Web Audio Api.</li>
                <li className="text-2xl">Why did i build this? Good question.</li>
                <li className="text-2xl">This app allowed me to use the Web Audio Api and modern Javascript features to build a new application.</li>
            </ul>
        </div>
    );
}