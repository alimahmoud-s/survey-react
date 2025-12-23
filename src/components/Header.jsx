import React from 'react';

const Header = ({ title, subtitle }) => {
    return (
        <header>
            <h1 id="titleText" dangerouslySetInnerHTML={{ __html: title }}></h1>
            <p className="subtitle" id="subtitleText">{subtitle}</p>
        </header>
    );
};

export default Header;