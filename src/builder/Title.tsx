export const Title = ({title}: {title: string}): JSX.Element => {
    return (
        <div className="p-5">
            <h1 className="text-3xl">{title}</h1>
        </div>
    );
}