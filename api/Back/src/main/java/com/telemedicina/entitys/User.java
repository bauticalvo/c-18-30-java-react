package com.telemedicina.entitys;

import java.util.Collection;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_user;

    @NotNull
    private String name;
    @NotNull
    private String lastname;
    @NotNull
    private int DNI;

    private String mail;
    private Date birthdate;
    private String gender;
    private String username;
    private String password;
    private int phone;

    @ManyToOne
    @JoinColumn(name = "id_country", referencedColumnName = "id_country")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "id_province", referencedColumnName = "id_province")
    private Province province;

    @ManyToOne
    @JoinColumn(name = "id_deparment", referencedColumnName = "id_deparment")
    private Deparment deparment;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
}