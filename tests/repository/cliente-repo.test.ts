import { Cliente } from "entities/cliente";
import { ClienteRepo } from "../../src/repository/cliente-repo";

describe('cliente-repo', () => {
    function createSut(){
        const sut = new ClienteRepo();
        const teste = 'teste';
        const umCliente = {id: '1', nome: 'teste', email: 'a@a.com',telefone: '123456789',cep: '12345678',
            endereco: 'rua teste',cidade: 'teste',estado: 'teste',cpf: '12345678901'}
        sut.save(umCliente);
        //Expectativa
        return { sut , teste, umCliente};
    }

    it('should be defined', () => {
        const { sut } = createSut();
        expect(sut).toBeDefined();
    });

    it('Deve ser capaz de salvar um cliente', async () => {
        //Configuração
        const { sut } = createSut();
        //Ação
        const resultado = await sut.save({id: '2', nome: 'teste', email: 'a@a.com',telefone: '123456789',cep: '12345678',
            endereco: 'rua teste',cidade: 'teste',estado: 'teste',cpf: '12345678901'});

            console.log(resultado);
        //Expectativa
        expect(resultado).toBe(true);
    });
    
    it('Teste buscar id inexistente 999', async() => {

        //Configuração
        const { sut } = createSut();
        //Ação
        
            //Expectativa
            await expect( sut.getById('999')).rejects.toThrow();
        
    });

    


    it('Deve ser capaz de buscar por id ', async ()=> {
        //Configuração
        const { sut } = createSut();
        //Ação
        const resultado = await sut.getById('1');
        //Expectativa
        expect(resultado).toBeTruthy();
    });

    it('Não deve ser capaz de deletar um cliente', async () => {
        //configuração
        const { sut } = createSut();
        //ação
        const resultado = await sut.delete('3');
        //expectativa
        expect(resultado).toBe(false);
    })

    it('Deve ser capaz de deletar um cliente', async () => {
        //configuração
        const { sut } = createSut();
        //ação
        const resultado = await sut.delete('1');
        //expectativa
        expect(resultado).toBe(true); //TODO: deveria ser um true, deve ser verificado posteriormente
    })

    it('Deve ser capas de listar todos os clientes', async () => {
      //configuração
        const { sut, umCliente } = createSut();
      //ação 
        const resultado = await sut.findAll();
        
        //expectativa
        expect(resultado).toEqual([umCliente]);
    })

    it("Deve ser capaz de atualizar um cliente", async () => {
        //configuração
        const { sut, umCliente } = createSut();
        const clienteAtualizado: Cliente = {id: '1', nome: 'teste2', email: 'a@a.com',telefone: '123456789',cep: '12345678',
            endereco: 'rua teste',cidade: 'teste',estado: 'teste',cpf: '12345678901'}
        
        //ação
        await sut.update('1', clienteAtualizado);

        //expectativa

        expect(await sut.getById('1')).toEqual(clienteAtualizado);


    })

    it("Deve lançar uma exceção ao tentar atualizar um cliente inexistente", async () => {
        //configuração
        const { sut, umCliente } = createSut();
        const clienteAtualizado: Cliente = {id: '99', nome: 'teste23265', email: 'a@a.com',telefone: '123456789',cep: '12345678',
            endereco: 'rua teste',cidade: 'teste',estado: 'teste',cpf: '12345678901'}

        //ação
     
        //expectativa
        await expect(sut.update('99', clienteAtualizado)).rejects.toThrow();
    });

    it("Deve ser capaz de buscar por nome", async () => {
        //configuração
        const { sut, umCliente } = createSut();
        //ação
        const resultado = await sut.findByName(umCliente.nome);
        //expectativa
        expect(resultado).toEqual([umCliente]);
    });

    it("Deve ser capaz de buscar por nome", async () => {
        //configuração
        const { sut, umCliente } = createSut();
        //ação
        const resultado = await sut.findByName('zzz');
        //expectativa
        expect(resultado).toEqual([]);
    });


});