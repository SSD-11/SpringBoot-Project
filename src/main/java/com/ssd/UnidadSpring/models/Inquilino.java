package com.ssd.UnidadSpring.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "inquilinos")
@ToString
@EqualsAndHashCode
public class Inquilino {

    @Id
    @Getter
    @Setter
    @Column(name = "documento")
    private Long documento;

    @Getter
    @Setter
    @Column(name = "tipo_Usuario")
    private String tipo_Usuario;

    @Getter
    @Setter
    @Column(name = "n_Apto")
    private Integer n_Apto;

    @Getter
    @Setter
    @Column(name = "nombre")
    private String nombre;

    @Getter
    @Setter
    @Column(name = "apellido")
    private String apellido;

    @Getter
    @Setter
    @Column(name = "email")
    private String email;
    @Getter
    @Setter
    @Column(name = "telefono")
    private String telefono;


    @Setter
    @Column(name = "vehiculo")
    private boolean vehiculo;


    @Getter
    @Setter
    @Column(name = "mascota")
    private boolean mascota;

    @Getter
    @Setter
    @Column(name = "password")
    private String password;

    @Getter
    @Setter
    @Column(name = "foto")
    private String foto;

    public boolean getVehiculo() {
        return vehiculo;
    }

    public boolean getMascota() {
        return mascota;
    }



}
