export function Panel({result}: {result: JSX.Element}) {
    return (
        <div className="w-1/3 px-4 overflow-hidden">
            {result}
        </div>
    );
}

export function PanelTitle({title}: {title: string}) {
    return (
        <h1 className="text-center text-xl p-4">{title}</h1>
    );
}   