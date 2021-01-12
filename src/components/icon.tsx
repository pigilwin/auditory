export const Play = (): JSX.Element => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="inline-block mb-1 fill-current text-black dark:text-white" width="25" height="25">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M8 5v14l11-7z"/>
        </svg>
    );
}

export const Stop = (): JSX.Element => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="inline-block mb-1 fill-current text-black dark:text-white" width="25" height="25">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 6h12v12H6z"/>
        </svg>
    );
}

export const FullVolume = (): JSX.Element => {
    return (
        <svg height="50" viewBox="0 0 21 21" width="50" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" className="stroke-current text-black dark:text-white" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)">
                <path d="m1.5 4.5h3l5-4v14l-5-4h-3c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1zm10 8c1.3333333-1 2-2.66666667 2-5s-.6666667-4-2-5"/>
                <path d="m11.5 5.5v4"/>
            </g>
        </svg>
    );
}

export const Mute = (): JSX.Element => {
    return (
        <svg className="inline-block mx-auto" height="50" viewBox="0 0 21 21" width="50" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" className="stroke-current text-black dark:text-white" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 2)">
                <path d="m1 5.5h2.5l5-5v16l-5-5h-2.5c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1z"/>
                <g transform="translate(10.328 5.657)">
                    <path d="m.172 4.843 4-4"/>
                    <path d="m4.17157288 4.84314575-4-4z"/>
                </g>
            </g>
        </svg>
    );
}