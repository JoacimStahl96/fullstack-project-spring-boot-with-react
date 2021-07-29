import React from "react";

const Students = (props) => {
	const getStudents = props.students;

	const handleUpdatePresence = (e, student) => {
		const isChecked = e.target.checked;
		props.updatePresence(student, isChecked);
	};

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
							{students.name} {students.last_name} {students.age}{" "}
							år
						</a>

						<button
							className="btn"
							onClick={() => props.deleteStudent(students)}
						>
							X
						</button>

						<label id="labelId" htmlFor={students.id}>
							<input
								className="input-checkbox"
								type="checkbox"
								id={students.id}
								defaultChecked={students.present}
								onChange={(e) =>
									handleUpdatePresence(e, students)
								}
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
