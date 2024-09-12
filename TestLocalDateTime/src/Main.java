import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        LocalTime time = LocalTime.now().truncatedTo(ChronoUnit.SECONDS);

        System.out.println(time);
    }
}