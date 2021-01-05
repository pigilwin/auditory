import { CreateNew } from "./CreateNew";
import { LoadPanel } from "./Load";

export const Begin = (): JSX.Element => {
    return (
        <div className="mx-auto w-1/2">
            <h1 className="text-2xl text-center">To begin using sounds, either create a new track below or view exisitng tracks.</h1>
            <div className="flex flex-row p-4">
                <CreateNew/>
                <LoadPanel/>
            </div>
        </div>
    );
};