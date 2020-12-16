interface LayerPartComponentInterface {
    sound: string;
}

export const LayerPartComponent = ({sound}: LayerPartComponentInterface): JSX.Element => {
    const classes: string[] = [
        "rounded",
        "p-2",
        "mx-1",
        "text-center",
        "bg-yellow-400",
        "w-10"
    ];

    return (
        <div className={classes.join(" ")}>
            <p className="font-extrabold text-2xl text-white">{sound}</p>
        </div>
    );
}