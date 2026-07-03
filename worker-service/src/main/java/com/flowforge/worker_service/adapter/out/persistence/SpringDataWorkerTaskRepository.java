package com.flowforge.worker_service.adapter.out.persistence;


import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataWorkerTaskRepository extends JpaRepository<WorkerTaskEntity,String> {
}
