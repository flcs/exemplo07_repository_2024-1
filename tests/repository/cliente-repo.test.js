var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ClienteRepo } from "../../src/repository/cliente-repo";
describe('cliente-repo', () => {
    function createSut() {
        const sut = new ClienteRepo();
        const teste = 'teste';
        const umCliente = { id: 1, nome: 'teste', email: 'a@a.com', telefone: '123456789', cep: '12345678',
            endereco: 'rua teste', cidade: 'teste', estado: 'teste', cpf: '12345678901' };
        sut.save(umCliente);
        return { sut, teste, umCliente };
    }
    it('should be defined', () => {
        const { sut } = createSut();
        expect(sut).toBeDefined();
    });
    it('Deve ser capaz de salvar um cliente', () => __awaiter(void 0, void 0, void 0, function* () {
        //Configuração
        const { sut } = createSut();
        //Ação
        const resultado = yield sut.save({ id: 2, nome: 'teste', email: 'a@a.com', telefone: '123456789', cep: '12345678',
            endereco: 'rua teste', cidade: 'teste', estado: 'teste', cpf: '12345678901' });
        // console.log(resultado);
        //Expectativa
        expect(resultado).toBe(true);
    }));
    it('Teste buscar id inexistente 999', () => __awaiter(void 0, void 0, void 0, function* () {
        //Configuração
        const { sut } = createSut();
        //Ação
        //Expectativa
        yield expect(sut.getById(999)).rejects.toThrow();
    }));
    it('Deve ser capaz de buscar por id ', () => __awaiter(void 0, void 0, void 0, function* () {
        //Configuração
        const { sut } = createSut();
        //Ação
        const resultado = yield sut.getById(1);
        //Expectativa
        expect(resultado).toBeTruthy();
    }));
    it('Não deve ser capaz de deletar um cliente', () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut } = createSut();
        //ação
        const resultado = yield sut.delete(3);
        //expectativa
        expect(resultado).toBe(false);
    }));
    it('Deve ser capaz de deletar um cliente', () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut } = createSut();
        //ação
        const resultado = yield sut.delete(1);
        //expectativa
        expect(resultado).toBe(true); //TODO: deveria ser um true, deve ser verificado posteriormente
    }));
    it('Deve ser capas de listar todos os clientes', () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut, umCliente } = createSut();
        //ação 
        const resultado = yield sut.findAll();
        //expectativa
        expect(resultado).toEqual([umCliente]);
    }));
    it("Deve ser capaz de atualizar um cliente", () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut, umCliente } = createSut();
        const clienteAtualizado = { id: 1, nome: 'teste2', email: 'a@a.com', telefone: '123456789', cep: '12345678',
            endereco: 'rua teste', cidade: 'teste', estado: 'teste', cpf: '12345678901' };
        //ação
        yield sut.update(1, clienteAtualizado);
        //expectativa
        expect(yield sut.getById(1)).toEqual(clienteAtualizado);
    }));
    it("Deve lançar uma exceção ao tentar atualizar um cliente inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut, umCliente } = createSut();
        const clienteAtualizado = { id: 99, nome: 'teste23265', email: 'a@a.com', telefone: '123456789', cep: '12345678',
            endereco: 'rua teste', cidade: 'teste', estado: 'teste', cpf: '12345678901' };
        //ação
        //expectativa
        yield expect(sut.update(99, clienteAtualizado)).rejects.toThrow();
    }));
    it("Deve ser capaz de buscar por nome", () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut, umCliente } = createSut();
        //ação
        const resultado = yield sut.findByName(umCliente.nome);
        //expectativa
        expect(resultado).toEqual([umCliente]);
    }));
    it("Deve ser capaz de buscar por nome", () => __awaiter(void 0, void 0, void 0, function* () {
        //configuração
        const { sut, umCliente } = createSut();
        //ação
        const resultado = yield sut.findByName('zzz');
        //expectativa
        expect(resultado).toEqual([]);
    }));
});
