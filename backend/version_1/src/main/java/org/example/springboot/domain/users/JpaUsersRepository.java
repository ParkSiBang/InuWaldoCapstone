package org.example.springboot.domain.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaUsersRepository extends JpaRepository<Users, Long>, UsersRepository {

    @Override
    Users save(Users users);

    @Override
    Optional<Users> findById(Long id);

    @Override
    Optional<Users> findByUserId(String userId);

    @Override
    Optional<Users> findByName(String name);

    @Override
    List<Users> findAll();
}
