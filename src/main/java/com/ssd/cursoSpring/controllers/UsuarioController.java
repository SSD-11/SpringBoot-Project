package com.ssd.cursoSpring.controllers;

import com.ssd.cursoSpring.dao.UsuarioDao;
import com.ssd.cursoSpring.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@PathVariable Long id) {
        Usuario usuario = new Usuario();
        usuario.setId(id);
        usuario.setNombre("Samuel");
        usuario.setApellido("SD");
        usuario.setEmail("ssd@gmail.com");
        usuario.setTelefono("123456789");
        usuario.setPassword("123456");
        return usuario;
    }

    @RequestMapping("api/usuarios")
    public List<Usuario> getUsuarios() {
        return usuarioDao.getUsuarios();
    }

    @RequestMapping("usuario22")
    public Usuario editar() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Samuel");
        usuario.setApellido("SD");
        usuario.setEmail("ssd@gmail.com");
        usuario.setTelefono("123456789");
        usuario.setPassword("123456");
        return usuario;
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@PathVariable Long id) {
        usuarioDao.eliminar(id);
    }

    @RequestMapping("usuario123")
    public Usuario buscar() {
        Usuario usuario = new Usuario();
        usuario.setNombre("Samuel");
        usuario.setApellido("SD");
        usuario.setEmail("ssd@gmail.com");
        usuario.setTelefono("123456789");
        usuario.setPassword("123456");
        return usuario;
    }

}
