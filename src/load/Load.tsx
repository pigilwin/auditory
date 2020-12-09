import { Title } from "../builder/Title"

export const LoadPanel = (): JSX.Element => {
    return (
        <div className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="text-center w-full">
                <Title title="Load Tracks"/>
            </div>
        </div>
    );
}