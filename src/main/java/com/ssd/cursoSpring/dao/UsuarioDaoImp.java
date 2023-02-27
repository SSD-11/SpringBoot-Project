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


}
