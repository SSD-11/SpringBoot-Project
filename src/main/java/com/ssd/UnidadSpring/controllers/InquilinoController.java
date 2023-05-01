package com.ssd.UnidadSpring.controllers;

import com.ssd.UnidadSpring.services.InquilinoDaoImp;
import com.ssd.UnidadSpring.models.Inquilino;
import com.ssd.UnidadSpring.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import repositories.InquilinoRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class InquilinoController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private InquilinoRepository inquilinoRepository;

    @Autowired
    private InquilinoDaoImp inquilinoDaoImp;

    @GetMapping(value = "api/inquilinos")
    public List<Inquilino> getInquilinos() {

        return inquilinoRepository.findAll();
    }

    @GetMapping(value = "api/getInquilino/{documento}")
    public Inquilino getInquilino(@PathVariable Long documento) {
        System.out.println("ID recibido en el controlador: " + documento);
        Optional<Inquilino> optionalUsuario = inquilinoRepository.findById(documento);
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

    @PostMapping(value = "api/inquilinos")
    public void registrarUsuario(@RequestBody Inquilino inquilino) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(2, 65536, 1, inquilino.getPassword());
        inquilino.setPassword(hash);

        inquilinoRepository.save(inquilino);
    }

    @DeleteMapping(value = "api/delInquilino/{documento}")
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long documento) {
        if (!validarToken(token)) {
            return;
        }

        inquilinoRepository.deleteById(documento);
    }

    @PutMapping("api/editInquilino/{documento}")
    public Inquilino updateInquilino(@RequestBody Inquilino request, @PathVariable Long documento) {
        return this.inquilinoDaoImp.updateById(request, documento);
    }
    //Guardar imagen
    @PutMapping("api/guardarImagenById/{documento}")
    public Inquilino guardarImagen(@RequestBody Inquilino request, @PathVariable Long documento) {
        return this.inquilinoDaoImp.guardarImagenById(request, documento);
    }
}
