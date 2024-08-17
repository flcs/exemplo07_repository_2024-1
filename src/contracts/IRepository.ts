import { Cliente } from "../entities/cliente";

export interface IRepository<T> {
    getById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    save(entity: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(id: string, entity: T): Promise<Cliente>;
}

