package com.ssd.UnidadSpring.services;

import com.ssd.UnidadSpring.models.Usuario;

import java.util.List;

public interface UsuarioDao {

    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registar(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
