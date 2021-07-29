package students.courses.Util;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class Utility {

    public String generateHashedStudentId(String unique) {
        try {
            MessageDigest hashFunc = MessageDigest.getInstance("SHA3-256");
            byte[] hashStudentId = hashFunc.digest(unique.getBytes());
            return hashStudentId.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "This didn't work";
        }
    }
}
