interface LayerPartComponentInterface {
    sound: string;
    index: number;
}

export const LayerPartComponent = ({sound, index}: LayerPartComponentInterface): JSX.Element => {
    const classes: string[] = [
        "rounded",
        "p-2",
        "mx-1",
        "text-center",
        "bg-yellow-400",
    ];

    const showConfigurationPanel = (): void => {

    };

    return (
        <div onClick={showConfigurationPanel} className={classes.join(" ")}>
            <p className="font-extrabold p-2 text-2xl text-white">{sound}</p>
        </div>
    );
}