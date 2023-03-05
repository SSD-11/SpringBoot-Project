package com.ssd.cursoSpring.dao;

import com.ssd.cursoSpring.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Usuario> getUsuarios() {
        String hql = "FROM Usuario";
        return entityManager.createQuery(hql).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        entityManager.remove(entityManager.find(Usuario.class, id)); // Elimina el usuario de la base de datos

    }

    @Override
    public void registar(Usuario usuario) {
        entityManager.merge(usuario); // Registra el usuario en la base de datos
    }

    @Override
    public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {
        String hql = "FROM Usuario WHERE email = :email";
        List<Usuario> lista = entityManager.createQuery(hql)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        if (lista.isEmpty()) {
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())) {
            return lista.get(0);
        }
        return null;
    }

}
