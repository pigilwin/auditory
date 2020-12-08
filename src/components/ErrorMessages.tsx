interface TextErrorMessageInterface {
    message: string;
}

export const basicTextErrorMessage = (content: TextErrorMessageInterface): JSX.Element => {
    
    if (content.message.length === 0) {
        return (<span></span>);
    }

    return (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
			{content.message}
		</span>
    );
}