package com.ssd.cursoSpring.dao;

import com.ssd.cursoSpring.models.Usuario;
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
    public boolean verificarEmailPassword(Usuario usuario) {
        String hql = "FROM Usuario WHERE email = :email AND password = :password";
        List<Usuario> lista = entityManager.createQuery(hql)
                .setParameter("email", usuario.getEmail())
                .setParameter("password", usuario.getPassword())
                .getResultList();

        return !lista.isEmpty();

    }

}
