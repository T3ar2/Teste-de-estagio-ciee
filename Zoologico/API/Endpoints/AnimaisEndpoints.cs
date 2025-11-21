using API.Models;
using Microsoft.EntityFrameworkCore;


namespace API.Endpoints;

public static class AnimaisEndpoints
{
    public static void MapAnimaisRoutes(this WebApplication app)
    {

        app.MapGet("/api/animais/listar", async (AppDbContext ctx) =>
        {
            var Animais = await ctx.Animais.ToListAsync();

            if (Animais.Any())
            {
                return Results.Ok(Animais);
            }
            return Results.NotFound("A lista de animais está vazia.");
        });

        app.MapGet("/api/animais/buscar/{id}", async (AppDbContext ctx, int id) =>
        {
            Animais? resultado = await ctx.Animais.FirstOrDefaultAsync(x => x.Id == id);
            if (resultado is null) { return Results.NotFound("Animal não encontrado."); }
            return Results.Ok(resultado);
        });

        app.MapPost("/api/animais/cadastrar", async (AppDbContext ctx, Animais novoAnimal) =>
        {
            if (string.IsNullOrWhiteSpace(novoAnimal.Nome))
            {
                return Results.BadRequest("Nome do animal é obrigatório.");
            }
            if (string.IsNullOrWhiteSpace(novoAnimal.Descricao))
            {
                return Results.BadRequest("Descrição é obrigatória.");
            }
            if (string.IsNullOrWhiteSpace(novoAnimal.DataNascimento))
            {
                return Results.BadRequest("Data de Nascimento é obrigatória.");
            }
            if (string.IsNullOrWhiteSpace(novoAnimal.Especie))
            {
                return Results.BadRequest("Espécie é obrigatória.");
            }
            if (string.IsNullOrWhiteSpace(novoAnimal.Habitat))
            {
                return Results.BadRequest("Habitat é obrigatório.");
            }
            if (string.IsNullOrWhiteSpace(novoAnimal.PaisDeOrigem))
            {
                return Results.BadRequest("País de Origem é obrigatório.");
            }

            bool jaExiste = await ctx.Animais.AnyAsync(x => x.Nome == novoAnimal.Nome);
            if (jaExiste is true) { return Results.Conflict("Animal já cadastrado no bando de dados."); }
            ctx.Animais.Add(novoAnimal);
            await ctx.SaveChangesAsync();
            return Results.Created($"/api/animais/buscar/id/{novoAnimal.Id}", novoAnimal);
        });

        app.MapDelete("/api/animais/deletar/{id}", async (AppDbContext ctx, int id) =>
        {
            Animais? resultado = await ctx.Animais.FindAsync(id);
            if (resultado is null) { return Results.NotFound("não é possivel deletar algo em que não está no banco de dados."); }
            ;
            ctx.Animais.Remove(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });

        app.MapPatch("/api/animais/atualizar/{id}", async (AppDbContext ctx, int id, Animais animalAlterado) =>
        {
            Animais? resultado = await ctx.Animais.FindAsync(id);
            if (resultado is null) { return Results.NotFound("Animal não encontrado."); }
            if (string.IsNullOrWhiteSpace(animalAlterado.Nome))
            {
                return Results.BadRequest("Nome do animal é obrigatório.");
            }
            if (string.IsNullOrWhiteSpace(animalAlterado.Descricao))
            {
                return Results.BadRequest("Descrição é obrigatória.");
            }
            if (string.IsNullOrWhiteSpace(animalAlterado.DataNascimento))
            {
                return Results.BadRequest("Data de Nascimento é obrigatória.");
            }
            if (string.IsNullOrWhiteSpace(animalAlterado.Especie))
            {
                return Results.BadRequest("Espécie é obrigatória.");
            }
            if (string.IsNullOrWhiteSpace(animalAlterado.Habitat))
            {
                return Results.BadRequest("Habitat é obrigatório.");
            }
            if (string.IsNullOrWhiteSpace(animalAlterado.PaisDeOrigem))
            {
                return Results.BadRequest("País de Origem é obrigatório.");
            }


            if (resultado.Nome != animalAlterado.Nome)
            {
                bool nomeJaExisteEmOutro = await ctx.Animais
                    .AnyAsync(x => x.Nome == animalAlterado.Nome && x.Id != id);

                if (nomeJaExisteEmOutro)
                {
                    return Results.Conflict("Já existe outro animal cadastrado com este nome.");
                }
            }



            resultado.Nome = animalAlterado.Nome;
            resultado.Descricao = animalAlterado.Descricao;
            resultado.DataNascimento = animalAlterado.DataNascimento;
            resultado.Especie = animalAlterado.Especie;
            resultado.Habitat = animalAlterado.Habitat;
            resultado.PaisDeOrigem = animalAlterado.PaisDeOrigem;
            ctx.Animais.Update(resultado);
            await ctx.SaveChangesAsync();
            return Results.Ok(resultado);
        });
    }
}