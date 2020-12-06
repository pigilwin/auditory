export const Panel = (props: React.PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className="w-1/3 px-4 overflow-hidden">
            {props.children}
        </div>
    );
}

export const PanelTitle = ({title}: {title: string}): JSX.Element => {
    return (
        <h1 className="text-center text-xl p-4">{title}</h1>
    );
}   