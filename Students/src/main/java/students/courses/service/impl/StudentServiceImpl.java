package students.courses.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import students.courses.Util.Utility;
import students.courses.dto.StudentDto;
import students.courses.repository.StudentRepository;
import students.courses.repository.entity.StudentEntity;
import students.courses.service.StudentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final Utility utility;

    // instead of @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, Utility utility) {
        this.studentRepository = studentRepository;
        this.utility = utility;
    }

    public List<StudentDto> getAllStudents() {

        Iterable<StudentEntity> studentEntities = studentRepository.findAll();
        ArrayList<StudentDto> studentDtos = new ArrayList<>();
        for (StudentEntity studentEntity : studentEntities) {
            StudentDto studentDto = new StudentDto();
            BeanUtils.copyProperties(studentEntity, studentDto);
            studentDtos.add(studentDto);
        }
        return studentDtos;
    }


    public Optional<StudentDto> getSpecificStudent(String studentId) {

        Optional<StudentEntity> studentIdEntity = studentRepository.findByStudentId(studentId);
        return studentIdEntity.map(studentEntity -> {
            StudentDto studentDto = new StudentDto();
            BeanUtils.copyProperties(studentEntity, studentDto);
            return studentDto;
        });
    }

    public StudentDto createStudent(StudentDto studentDetails) {
            // age is also validated in frontend, better safe than sorry
        if (studentDetails.getName().equals("") || studentDetails.getLastName().equals("") || studentDetails.getAge() < 5) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        }
        StudentEntity studentEntity = new StudentEntity();

        BeanUtils.copyProperties(studentDetails, studentEntity);
        //Generate a hashCode as student_id
        String studentId = utility.generateHashedStudentId(studentDetails.getName());
        studentEntity.setStudentId(studentId.substring(3));
        //Save new data-->
        StudentEntity studentEntityOut = studentRepository.save(studentEntity);
        StudentDto studentDtoOut = new StudentDto();
        BeanUtils.copyProperties(studentEntityOut, studentDtoOut);

        return studentDtoOut;
    }

    public Optional<StudentDto> updateStudent(String studentId, StudentDto studentDto) {

        Optional<StudentEntity> studentIdEntity = studentRepository.findByStudentId(studentId);
        if (studentIdEntity.isEmpty())
            return Optional.empty();

        return studentIdEntity.map(studentEntity -> {
            StudentDto response = new StudentDto();
            studentEntity.setStudentId(studentDto.getStudentId() != null ? utility.generateHashedStudentId(studentDto.getName()).substring(3) : studentEntity.getStudentId());
            studentEntity.setName(studentDto.getName() != null ? studentDto.getName() : studentEntity.getName());
            studentEntity.setLastName(studentDto.getLastName() != null ? studentDto.getLastName() : studentEntity.getLastName());

            studentEntity.setPresent(studentDto.isPresent() != studentEntity.isPresent() ? studentDto.isPresent() : studentEntity.isPresent());

            studentEntity.setAge(studentDto.getAge() != null ? studentDto.getAge() : studentEntity.getAge());

            StudentEntity updatedStudentEntity = studentRepository.save(studentEntity);
            BeanUtils.copyProperties(updatedStudentEntity, response);

            return response;
        });

    }


    public void deleteStudent(String studentId) {
        Optional<StudentEntity> studentExists = studentRepository.findByStudentId(studentId);

        if (studentExists.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student doesn't exists");
        }
        studentRepository.delete(studentExists.get());
    }
}
