package repositories;

import com.ssd.UnidadSpring.models.Inquilino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InquilinoRepository extends JpaRepository<Inquilino, Long> {

    Optional<Inquilino> findById(Long id);

    Inquilino save(Inquilino inquilino);

    void deleteById(Long id);

}
