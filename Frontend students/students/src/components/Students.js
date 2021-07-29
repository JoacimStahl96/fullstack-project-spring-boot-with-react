import React, { useState } from "react";

const Students = (props) => {
	const getStudents = props.students;
	const [checked, setChecked] = useState(getStudents.present);

	const linkHandler = (student) => {
		props.setSpecificStudent(student);
		props.setView("editUpdate");
	};
	return (
		<ul>
			{getStudents.map((students, index) => {
				return (
					<li key={index}>
						<a href="#" onClick={() => linkHandler(students)}>
							{students.name} {students.last_name}{" "}
						</a>

						<label id="labelId">
							<input
								id="present"
								type="checkbox"
								defaultChecked={students.present}
								onChange={() => {
									setChecked(!checked);
								}}
							></input>
							Present
						</label>
					</li>
				);
			})}
		</ul>
	);
};

export default Students;
