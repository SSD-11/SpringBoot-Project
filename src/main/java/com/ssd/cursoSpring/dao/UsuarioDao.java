package com.ssd.cursoSpring.dao;

import com.ssd.cursoSpring.models.Usuario;

import java.util.List;

public interface UsuarioDao {

    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registar(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
