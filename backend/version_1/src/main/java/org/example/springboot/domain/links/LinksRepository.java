package org.example.springboot.domain.links;

import org.example.springboot.domain.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LinksRepository extends JpaRepository<Links, Long> {
    Optional<Links> findByStartNode(int nodeId);
    Optional<Links> findByDestNode(int nodeId);

    List<Links> findAllByStartNode(int nodeId);
    List<Links> findAllByDestNode(int nodeId);
}
