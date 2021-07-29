import React from "react";

const Title = (props) => {
	const clickHandler = () => {
		props.setView("editUpdate");
	};
	return (
		<>
			<header onClick={() => clickHandler()}>Välkommen</header>
		</>
	);
};

export default Title;
