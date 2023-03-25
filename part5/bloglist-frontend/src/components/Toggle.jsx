import {forwardRef, useImperativeHandle, useState} from 'react';

const Toggle = forwardRef((props, refs) => {
    const [visibility, setVisibility] = useState(props.default);

    const hideWhenVisible = {display: visibility ? 'none' : ''};
    const showWhenVisible = {display: visibility ? '' : 'none'};

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.showLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    );
});

export default Toggle;