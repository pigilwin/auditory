import { useDispatch, useSelector } from "react-redux";
import { currentTrackIdSelector } from "../../store/track/trackSelectors";
import { clearCurrentTrack } from "../../store/track/trackSlice";
import { welcomeSelector } from "../../store/welcome/welcomeSlice";

export const GoBack = (): JSX.Element | null => {

    const dispatch = useDispatch();
    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const currentTrackId = useSelector(currentTrackIdSelector);

    /**
     * If the welcome message has not been
     * seen then this button should never show
     */
    if (!hasUsedWelcomeMessage) {
        return null;
    }

    /**
     * If we have no currently selected track
     * then this button should also not show
     */
    if (currentTrackId.length === 0) {
        return null;
    }

    const onClickHandler = (): void => {
        dispatch(clearCurrentTrack());
    }
    
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={onClickHandler} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer dark:text-white dark:hover:text-blue-100 hover:text-blue-100 text-lg">
            Go Back to Track List
        </a>
    );
}