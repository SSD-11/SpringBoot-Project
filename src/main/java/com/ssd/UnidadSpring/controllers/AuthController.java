package com.ssd.UnidadSpring.controllers;

import com.ssd.UnidadSpring.models.Inquilino;
import com.ssd.UnidadSpring.services.InquilinoDao;
import com.ssd.UnidadSpring.services.UsuarioDao;
import com.ssd.UnidadSpring.models.Usuario;
import com.ssd.UnidadSpring.utils.JWTUtil;
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
    private InquilinoDao inquilinoDao;

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

    @RequestMapping(value = "api/inquilinoLogin", method = RequestMethod.POST)
    public String InquilinoLogin(@RequestBody Inquilino inquilino) {
        Inquilino inquilinologueado = inquilinoDao.obtenerUsuarioPorCredenciales(inquilino);
        if (inquilinologueado != null) {

            String tokenJwt = jwtUtil.create(String.valueOf(inquilinologueado.getDocumento()), inquilinologueado.getEmail());
            return tokenJwt;
        }
        return "ERROR";
    }
}
