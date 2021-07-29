package students.courses.repository;

import org.springframework.data.repository.CrudRepository;
import students.courses.repository.entity.StudentEntity;

import java.util.Optional;

public interface StudentRepository extends CrudRepository<StudentEntity, Long> {
    Optional<StudentEntity> findByStudentId(String studentId);

}
