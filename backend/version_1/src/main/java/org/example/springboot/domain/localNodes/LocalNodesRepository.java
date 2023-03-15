package org.example.springboot.domain.localNodes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocalNodesRepository extends JpaRepository<LocalNodes, Long> {
    Optional<LocalNodes> findByNodeId(Integer nodeId);


}
