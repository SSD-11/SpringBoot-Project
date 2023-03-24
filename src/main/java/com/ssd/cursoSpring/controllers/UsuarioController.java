package com.ssd.cursoSpring.controllers;

import com.ssd.cursoSpring.dao.UsuarioDaoImp;
import com.ssd.cursoSpring.models.Usuario;
import com.ssd.cursoSpring.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import repositories.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class UsuarioController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioDaoImp usuarioDaoImp;


    @GetMapping(value = "api/usuarios")
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) {
            return null;
        }

        return usuarioRepository.findAll();
    }

    @GetMapping(value = "api/getUsuario/{id}")
    public Usuario getUsuario(@PathVariable Long id) {
        System.out.println("ID recibido en el controlador: " + id);
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isPresent()) {
            return optionalUsuario.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;
    }


    @PostMapping(value = "api/usuarios")
    public void registrarUsuario(@RequestBody Usuario usuario) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(2, 65536, 1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioRepository.save(usuario);
    }

    @DeleteMapping(value = "api/delUsuario/{id}")
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }

        usuarioRepository.deleteById(id);
    }

    @PutMapping("api/editUsuarios/{id}")
    public Usuario updateUsuario(@RequestBody Usuario request, @PathVariable Long id) {
        return this.usuarioDaoImp.updateById(request, id);
    }
}
