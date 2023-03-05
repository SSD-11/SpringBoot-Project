package com.ssd.cursoSpring.controllers;

import com.ssd.cursoSpring.dao.UsuarioDao;
import com.ssd.cursoSpring.models.Usuario;
import com.ssd.cursoSpring.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) {
        Usuario usuariologueado = usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        if (usuariologueado != null) {

            String tokenJwt = jwtUtil.create(String.valueOf(usuariologueado.getId()), usuariologueado.getEmail());
            return tokenJwt;
        }
        return "ERROR";
    }
}
