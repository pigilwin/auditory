import { CreateNew } from "./CreateNew";
import { LoadPanel } from "./Load";

export const Begin = (): JSX.Element => {
    return (
        <div className="mx-auto">
            <h1 className="text-2xl text-center">To begin using sounds, either create a new track below or view exisitng tracks.</h1>
            <div className="grid grid-cols-2 grid-flow-col p-4">
                <CreateNew/>
                <LoadPanel/>
            </div>
        </div>
    );
};