const text: string[] = [
    "Sounds is a sound generation and track building application built using the Web Audio Api.",
    "Why did i build this? Good question.",
    "This app allowed me to use the Web Audio Api and modern Javascript features to build a new application."
];

export const AboutPanel = (): JSX.Element => {
    
    const elements: JSX.Element[] = text.map((v) => {
        return <li className="text-2xl p-4">{v}</li>;
    });
    
    return (
        <div className="px-4 overflow-hidden min-h-screen">
            <h1 className="text-6xl text-center">About</h1>
            <ul className="mx-auto p-2">
                {elements}
            </ul>
        </div>
    );
}