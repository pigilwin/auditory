import {PanelTitle} from '../components/Panel';

export const AboutPanel = (): JSX.Element => {
    return (
        <div className="px-4 overflow-hidden">
            <PanelTitle title="About"/>
            <ul>
                <li>Sounds is a sound generation and track building application built using the Web Audio Api.</li>
                <li>Why did i build this? Good question.</li>
                <li>This app allowed me to use the Web Audio Api and modern Javascript features to build a new application.</li>
            </ul>
        </div>
    );
}