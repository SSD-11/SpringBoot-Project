package com.ssd.UnidadSpring.services;

import com.ssd.UnidadSpring.models.Inquilino;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;
import repositories.InquilinoRepository;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
@Transactional
public class InquilinoDaoImp implements InquilinoRepository, InquilinoDao {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    InquilinoRepository inquilinoRepository;



    public Inquilino updateById(Inquilino request, Long id) {
        Inquilino inquilino = inquilinoRepository.findById(id).get();
        inquilino.setTipo_Usuario(request.getTipo_Usuario());
        inquilino.setN_Apto(request.getN_Apto());
        inquilino.setNombre(request.getNombre());
        inquilino.setApellido(request.getApellido());
        inquilino.setEmail(request.getEmail());
        inquilino.setTelefono(request.getTelefono());

        return inquilinoRepository.save(inquilino);

    }


    public Inquilino guardarImagenById(Inquilino request, Long id) {
        Inquilino inquilino = inquilinoRepository.findById(id).get();
        inquilino.setFoto(request.getFoto());
        return inquilinoRepository.save(inquilino);
    }

    @Override
    public Inquilino obtenerUsuarioPorCredenciales(Inquilino inquilino) {
        String hql = "FROM Inquilino WHERE email = :email";
        List<Inquilino> lista = entityManager.createQuery(hql)
                .setParameter("email", inquilino.getEmail())
                .getResultList();
        
        if (lista.isEmpty()) {
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, inquilino.getPassword())) {
            return lista.get(0);
        }
        return null;
    }


    @Override
    public List<Inquilino> getUsuarios() {
        return null;
    }

    @Override
    public Optional<Inquilino> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public Inquilino save(Inquilino inquilino) {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void delete(Inquilino entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Long> longs) {

    }

    @Override
    public void deleteAll(Iterable<? extends Inquilino> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends Inquilino> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Inquilino> List<S> saveAllAndFlush(Iterable<S> entities) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<Inquilino> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Long> longs) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Inquilino getOne(Long aLong) {
        return null;
    }

    @Override
    public Inquilino getById(Long aLong) {
        return null;
    }

    @Override
    public Inquilino getReferenceById(Long aLong) {
        return null;
    }

    @Override
    public <S extends Inquilino> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Inquilino> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Inquilino> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Inquilino> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Inquilino> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Inquilino> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Inquilino, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Inquilino> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public List<Inquilino> findAll() {
        return null;
    }

    @Override
    public List<Inquilino> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public List<Inquilino> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<Inquilino> findAll(Pageable pageable) {
        return null;
    }
}
