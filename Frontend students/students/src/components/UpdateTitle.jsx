import React from "react";

const UpdateTitle = (props) => {
	const clickHandler = () => {
		props.setView("startPage");
	};
	return (
		<>
			<header onClick={() => clickHandler()}>Edit or delete students</header>
		</>
	);
};

export default UpdateTitle;
