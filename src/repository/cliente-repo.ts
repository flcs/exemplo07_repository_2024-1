import { IRepository } from "../contracts/IRepository";
import { Cliente } from "../entities/cliente";


export class ClienteRepo implements IRepository<Cliente> {
    private lista: Cliente[] = [];

    async getById(id: number): Promise<Cliente> {
        const cliente = this.lista.find(c => c.id === id);
        if (!cliente) throw new Error('Cliente não encontrado');
        return cliente;
    }

    async findAll(): Promise<Cliente[]> {
        return this.lista;
    }

    async save(entity: Cliente): Promise<boolean> {
        this.lista.push(entity);
        return true;
    }

    async delete(id: number): Promise<boolean> {
        const result = this.lista.filter(c => c.id !== id);
        if (result.length === this.lista.length) return false;
        return true;
    }
    
    async findByName(nome: string): Promise<Cliente[]> {
        return this.lista.filter(c => c.nome === nome);
    }

    async update(id: number, entity: Cliente): Promise<Cliente> {
        if(!this.lista.find(c => c.id === id)) throw new Error('Cliente não encontrado');

        this.lista = this.lista.map(c => c.id === id ? entity : c);

        return entity;
    }
}