package com.ssd.UnidadSpring.services;

import com.ssd.UnidadSpring.models.Inquilino;

import java.util.List;

public interface InquilinoDao {

    List<Inquilino> getUsuarios();

    Inquilino obtenerUsuarioPorCredenciales(Inquilino inquilino);
}
